import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import nodeFetch from "node-fetch";

export const notion = new Client({ 
  auth: process.env.NOTION_TOKEN,
  fetch: nodeFetch as any
});
export const databaseId = process.env.NOTION_DATABASE_ID as string;
export const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("video", async (block) => {
  const video = (block as any).video;
  if (!video) return false;
  
  const url = video.external?.url || video.file?.url;
  if (!url) return false;
  
  let embedUrl = url;
  if (url.includes("youtube.com/watch?v=")) {
    embedUrl = url.replace("youtube.com/watch?v=", "youtube.com/embed/");
  } else if (url.includes("youtu.be/")) {
    embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
  }
  
  return `<div class="notion-video-container full-width-breakout"><iframe src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
});

let cachedDataSourceIdPromise: Promise<string> | null = null;

export function getDataSourceId(dbId: string): Promise<string> {
  if (cachedDataSourceIdPromise) return cachedDataSourceIdPromise;

  cachedDataSourceIdPromise = notion.databases.retrieve({ database_id: dbId }).then((db) => {
    if (!("data_sources" in db) || !db.data_sources?.length) {
      throw new Error(
        `No data sources found for database ${dbId} — check integration permissions`
      );
    }
    return db.data_sources[0].id;
  }).catch(err => {
    cachedDataSourceIdPromise = null;
    throw err;
  });

  return cachedDataSourceIdPromise;
}