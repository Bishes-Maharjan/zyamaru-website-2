import { notion, databaseId, n2m, getDataSourceId } from './client';
import type { BlogPost } from '../../types/notion';
import type {
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { prisma } from '../prisma';
import cloudinary from '../cloudinary/cloudinary';
import { rehostImage } from './rehostImage';
import { MdBlock } from 'notion-to-md/build/types';

/**
 * Extract a text property value from a Notion page.
 */
function getTextProperty(
  page: PageObjectResponse,
  propertyName: string
): string {
  const prop = page.properties[propertyName];
  if (!prop) return '';

  if (prop.type === 'title') {
    return prop.title.map((t) => t.plain_text).join('') || '';
  }
  if (prop.type === 'rich_text') {
    return prop.rich_text.map((t) => t.plain_text).join('') || '';
  }
  return '';
}

/**
 * Extract the date from a Notion page date property.
 */
function getDateProperty(
  page: PageObjectResponse,
  propertyName: string
): string {
  const prop = page.properties[propertyName];
  if (!prop || prop.type !== 'date' || !prop.date) return '';
  return prop.date.start;
}

/**
 * Get the cover image URL from a Notion page.
 */
function getCoverImage(page: PageObjectResponse): string | null {
  if (!page.cover) return null;

  if (page.cover.type === 'external') {
    return page.cover.external.url;
  }
  if (page.cover.type === 'file') {
    return page.cover.file.url;
  }
  return null;
}

function getMultiSelectProperty(
  page: PageObjectResponse,
  propertyName: string
): string[] {
  const prop = page.properties[propertyName];
  if (!prop || prop.type !== 'multi_select') return [];
  return prop.multi_select.map((item) => item.name);
}

/**
 * Check if the cached page is stale.
 */
async function checkStaleness(
  pageId: string,
  lastEditedTime: string
): Promise<{ exists: boolean; stale: boolean; cached: any | null }> {
  const existing = await prisma.blogPostCache.findUnique({
    where: { pageId },
  });

  if (!existing) return { exists: false, stale: true, cached: null };

  const isStale = new Date(lastEditedTime) > existing.lastSyncedAt;
  return { exists: true, stale: isStale, cached: existing };
}

/**
 * Recursively walk MdBlocks, find images, upload to Cloudinary, and replace URLs.
 */
async function processImageBlocks(blocks: MdBlock[], postId: string, isStale: boolean) {
  for (const block of blocks) {
    if (block.type === 'image') {
      const match = block.parent.match(/!\[([^\]]*)\]\((.*?)\)/);
      if (match) {
        const alt = match[1];
        const imageUrl = match[2];
        const blockId = block.blockId;

        // Check if image exists in DB
        const existingImage = await prisma.notionImage.findUnique({
          where: { blockId },
        });

        let cloudinaryUrl = existingImage?.hostedUrl;

        // Rehost if missing or page is stale (and we want to ensure fresh image)
        // Note: isStale is true when page was edited, so image might have changed url
        if (!cloudinaryUrl || isStale) {
          try {
            const uploadRes = await cloudinary.uploader.upload(imageUrl, {
              public_id: blockId,
              folder: 'blog-images',
              overwrite: true,
              resource_type: 'image',
            });
            cloudinaryUrl = uploadRes.secure_url;

            await prisma.notionImage.upsert({
              where: { blockId },
              update: {
                hostedUrl: cloudinaryUrl,
                notionUrl: imageUrl,
              },
              create: {
                blockId,
                hostedUrl: cloudinaryUrl,
                notionUrl: imageUrl,
                post: { connect: { pageId: postId } },
              },
            });
          } catch (err) {
            console.error(`Failed to upload image block ${blockId} to Cloudinary:`, err);
            // Fallback to original url if upload fails
            cloudinaryUrl = imageUrl;
          }
        }

        // Replace the markdown parent string with the new cloudinary URL
        if (cloudinaryUrl) {
          block.parent = `![${alt}](${cloudinaryUrl})`;
        }
      }
    }

    // Process children recursively
    if (block.children && block.children.length > 0) {
      await processImageBlocks(block.children, postId, isStale);
    }
  }
}

/**
 * Fetch a single blog post by its slug.
 * Returns full content as markdown + metadata.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const dsId = await getDataSourceId(databaseId);
  const response = await notion.dataSources.query({
    data_source_id: dsId,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  const page = response.results[0];
  if (!page || !('properties' in page)) return null;

  const typedPage = page as PageObjectResponse;
  const pageId = typedPage.id;

  // Check staleness against BlogPostCache
  const { exists, stale, cached } = await checkStaleness(pageId, typedPage.last_edited_time);

  const hasMarkdown = cached && cached.markdown && cached.markdown.length > 0;

  if (exists && !stale && cached && hasMarkdown) {
    return {
      id: cached.pageId,
      title: cached.title,
      slug: cached.slug,
      date: cached.lastSyncedAt.toISOString(),
      description: cached.description ?? "",
      coverImage: cached.coverUrl ?? null,
      author: cached.author ?? "",
      tags: cached.tag ? cached.tag.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      markdown: cached.markdown,
      lastEditedTime: typedPage.last_edited_time,
    };
  }

  // Cover Image
  const notionCoverUrl = getCoverImage(typedPage);
  let coverImageURL: string | null = null;
  if (notionCoverUrl) {
    try {
      coverImageURL = await rehostImage(notionCoverUrl, pageId);
    } catch (err) {
      console.error(`Failed to rehost cover for page ${pageId}:`, err);
    }
  }

  // Convert page blocks to markdown using notion-to-md
  const mdBlocks = await n2m.pageToMarkdown(pageId);

  const title = getTextProperty(typedPage, 'Name') || getTextProperty(typedPage, 'Title');
  const postSlug = getTextProperty(typedPage, 'Slug') || slug;
  const description = getTextProperty(typedPage, 'Description');
  const author = getTextProperty(typedPage, 'Author');
  const status = getTextProperty(typedPage, 'Status') || 'Published'; // Though we filtered by Published
  const tags = getMultiSelectProperty(typedPage, 'Tag');
  const lastSyncedAt = new Date();

  const data = {
    title,
    slug: postSlug,
    description,
    coverUrl: coverImageURL ?? undefined,
    status,
    author,
    tag: tags.length > 0 ? tags.join(', ') : null,
    lastSyncedAt,
  };

  // Ensure BlogPostCache exists before processing images so foreign key constraint doesn't fail
  await prisma.blogPostCache.upsert({
    where: { pageId },
    update: data,
    create: { pageId, markdown: "", ...data },
  });

  // Walk and rewrite image blocks
  await processImageBlocks(mdBlocks, pageId, stale);

  const mdString = n2m.toMarkdownString(mdBlocks);
  const markdown = mdString.parent;

  // Final update to save the generated markdown
  const upserted = await prisma.blogPostCache.update({
    where: { pageId },
    data: { markdown }
  });

  return {
    id: upserted.pageId,
    title: upserted.title,
    slug: upserted.slug,
    date: upserted.lastSyncedAt.toISOString(),
    description: upserted.description ?? "",
    coverImage: upserted.coverUrl ?? null,
    author: upserted.author ?? "",
    tags: upserted.tag ? upserted.tag.split(',').map((t) => t.trim()).filter(Boolean) : [],
    markdown: upserted.markdown,
    lastEditedTime: typedPage.last_edited_time,
  };
}
