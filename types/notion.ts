// types/notion.ts

export interface BlogPostMeta {
    id: string;
    title: string;
    slug: string;
    date: string;
    description: string;
    coverImage: string | null;
    author: string;
}

export interface BlogPost extends BlogPostMeta {
    markdown: string;
    lastEditedTime: string;
}
interface RichTextItem {
    type: "text";
    text: {
        content: string;
        link: { url: string } | null;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
}

interface NotionFileCover {
    type: "file";
    file: {
        url: string;
        expiry_time: string;
    };
}

interface NotionExternalCover {
    type: "external";
    external: {
        url: string;
    };
}

interface BlogPostProperties {
    Status: {
        id: string;
        type: "status";
        status: {
            id: string;
            name: string;
            color: string;
        } | null;
    };
    Date: {
        id: string;
        type: "date";
        date: {
            start: string;
            end: string | null;
            time_zone: string | null;
        } | null;
    };
    Slug: {
        id: string;
        type: "rich_text";
        rich_text: RichTextItem[];
    };
    Author: {
        id: string;
        type: "rich_text";
        rich_text: RichTextItem[];
    };
    Description: {
        id: string;
        type: "rich_text";
        rich_text: RichTextItem[];
    };
    Title: {
        id: string;
        type: "title";
        title: RichTextItem[];
    };
}

export interface NotionBlogPage {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: { object: "user"; id: string };
    last_edited_by: { object: "user"; id: string };
    cover: NotionFileCover | NotionExternalCover | null;
    icon: { type: "emoji"; emoji: string } | null;
    parent: {
        type: "data_source_id";
        data_source_id: string;
        database_id: string;
    };
    in_trash: boolean;
    is_archived: boolean;
    is_locked: boolean;
    properties: BlogPostProperties;
    url: string;
    public_url: string | null;
    archived: boolean;
}