import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/notion/getPosts';
import { getPostBySlug } from '@/lib/notion/getPostBySlug';
import NotionContent from './NotionContent';
import '../blog.css';

// Pre-render all blog posts at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  'use cache';
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | ZYAMARU',
    };
  }

  return {
    title: `${post.title} | ZYAMARU Blog`,
    description: post.description,
    alternates: {
      canonical: `https://www.zyamarufilms.com.np/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.zyamarufilms.com.np/blog/${slug}`,
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  'use cache';
  cacheLife('minutes'); // Revalidate frequently

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Rough estimate of reading time (200 words per minute)
  const wordCount = post.markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="section" style={{ paddingTop: '190px', minHeight: '100vh' }}>
      <div className="prose-container">
        <Link
          href="/blog"
          className="back-to-journal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </Link>

        <header className="blog-post-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span className="blog-post-date">
              {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : ''}
            </span>
            <span style={{ color: 'var(--color-border)', fontSize: '0.8rem' }}>•</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              {readingTime} min read
            </span>
          </div>

          <h1 className="blog-post-title">{post.title}</h1>

        </header>

        {post.coverImage && (
          <div className="blog-post-cover">
            <Image
              loading="eager"
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <article>
          <NotionContent content={post.markdown} />
        </article>
      </div>
    </main>
  );
}
