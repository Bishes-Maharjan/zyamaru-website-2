import { NextRequest, NextResponse } from 'next/server';

/**
 * Allowed Notion S3 image domains.
 * Validates that we only proxy actual Notion-hosted images.
 */
const ALLOWED_HOSTS = [
  's3.us-west-2.amazonaws.com',
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'www.notion.so',
  'images.unsplash.com', // Notion uses Unsplash for cover images
];

/**
 * GET /api/notion-image?url=<encoded-notion-image-url>
 *
 * Proxies Notion S3 images to prevent URL expiry.
 * Notion's S3 signed URLs expire after ~1 hour. This route fetches the image
 * on behalf of the client and returns it with long-lived cache headers.
 *
 * ISR revalidation ensures fresh signed URLs are obtained from Notion
 * regularly, so the proxy always has a valid upstream URL.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing "url" query parameter' },
      { status: 400 }
    );
  }

  // Validate the URL is from an allowed Notion domain
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 }
    );
  }

  const isAllowed = ALLOWED_HOSTS.some(
    (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`)
  );

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'URL domain not allowed' },
      { status: 403 }
    );
  }

  try {
    const imageResponse = await fetch(url, {
      next: { revalidate: 3600 }, // Re-fetch from Notion every hour
    });

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image from Notion' },
        { status: imageResponse.status }
      );
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const buffer = await imageResponse.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
