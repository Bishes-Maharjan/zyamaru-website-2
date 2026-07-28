import { prisma } from "@/lib/prisma";
import { rehostImage } from "./rehostImage";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getCoverImage, getTextProperty, getDateProperty, getStatusProperty, getMultiSelectProperty } from "./getPosts";


async function checkStaleness(
    pageId: string,
    lastEditedTime: string
): Promise<{ exists: boolean; stale: boolean }> {
    const existing = await prisma.blogPostCache.findUnique({
        where: { pageId },
    });

    if (!existing) return { exists: false, stale: true };

    const isStale = new Date(lastEditedTime) > existing.lastSyncedAt;
    return { exists: true, stale: isStale };
}

export async function uploadIntoDB(page: PageObjectResponse) {
    const pageId = page.id;
    const { exists, stale } = await checkStaleness(pageId, page.last_edited_time);

    if (exists && !stale) {
        return prisma.blogPostCache.findUnique({ where: { pageId } });
    }

    const coverUrl = getCoverImage(page);
    let coverImageURL: string | null = null;

    if (coverUrl) {
        try {
            coverImageURL = await rehostImage(coverUrl, pageId);
        } catch (err) {
            console.error(`Failed to rehost cover for page ${pageId}:`, err);
        }
    }

    const title = getTextProperty(page, "Title") || "Untitled";
    const slug = getTextProperty(page, "Slug") || pageId;
    const description = getTextProperty(page, "Description");
    const status = getStatusProperty(page, "Status");
    const author = getTextProperty(page, "Author");
    const tags = getMultiSelectProperty(page, "Tag");

    const data = {
        title,
        slug,
        description,
        coverUrl: coverImageURL ?? undefined,
        status,
        author,
        tag: tags.length > 0 ? tags.join(', ') : null,
        lastSyncedAt: new Date(),
    };

    return prisma.blogPostCache.upsert({
        where: { pageId },
        update: data,
        create: { pageId, markdown: "", ...data },
    });
}