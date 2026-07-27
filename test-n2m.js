const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: {} });
const blocks = [{ type: "paragraph", parent: "Hello world" }];
const md = n2m.toMarkdownString(blocks);
console.log(typeof md);
console.log(md);
