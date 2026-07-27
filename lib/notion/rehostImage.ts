import cloudinary from "../cloudinary/cloudinary";

export async function rehostImage(
    notionUrl: string,
    blockId: string
): Promise<string> {
    const result = await cloudinary.uploader.upload(notionUrl, {
        public_id: blockId,
        folder: "blog-images",
        overwrite: true,
        resource_type: "image",
    });

    return result.secure_url;
}