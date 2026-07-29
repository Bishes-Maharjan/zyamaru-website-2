import { notion, databaseId, getDataSourceId } from './client';
import type { BlogPostMeta } from '../../types/notion';
import type {
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { uploadIntoDB } from './prismaUpload';


/**
 * Extract a text property value from a Notion page.
 */
export function getTextProperty(
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

export function getMultiSelectProperty(
  page: PageObjectResponse,
  propertyName: string
): string[] {
  const prop = page.properties[propertyName];
  if (!prop || prop.type !== 'multi_select') return [];
  return prop.multi_select.map((item) => item.name);
}

export function getStatusProperty(page: PageObjectResponse, propertyName: string): string {
  const prop = page.properties[propertyName];
  if (!prop || prop.type !== "status") return "draft";
  return prop.status?.name ?? "draft";
}

/**
 * Extract the date from a Notion page date property.
 */
export function getDateProperty(
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
export function getCoverImage(page: PageObjectResponse): string | null {

  if (!page.cover) return null;

  if (page.cover.type === 'external') {
    return page.cover.external.url;
  }
  if (page.cover.type === 'file') {
    return page.cover.file.url;
  }
  return null;
}

/**
 * Fetch all published blog posts from the Notion database.
 * Returns metadata only (no content) — suitable for the list page.
 */


export async function getPosts(): Promise<BlogPostMeta[]> {
  const dsId = await getDataSourceId(databaseId);

  const response = await notion.dataSources.query({
    data_source_id: dsId,
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  // Sync each page, and use the DB row (with permanent cover URL) as the source of truth
  const dbPosts = await Promise.all(
    pages.map((page) =>
      uploadIntoDB(page).catch((err) => {
        console.error(`Failed to sync page ${page.id}:`, err);
        return null;
      })
    )
  );

  const posts: BlogPostMeta[] = dbPosts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map((post) => ({
      id: post.pageId,
      title: post.title,
      slug: post.slug,
      date: post.lastSyncedAt?.toISOString() ?? "",
      description: post.description ?? "",
      coverImage: post.coverUrl ?? null,
      author: post.author ?? "",
      tags: post.tag ? post.tag.split(',').map((t) => t.trim()).filter(Boolean) : [],
    }));


  // console.log(JSON.stringify(posts, null, 2));
  return posts;
}