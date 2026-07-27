import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/notion/getPosts';
import './blog.css';

export const metadata = {
  title: 'Blog | ZYAMARU',
  description: 'Insights on cinematography, filmmaking, and visual storytelling from ZYAMARU academy instructors and alumni.',
};

export default async function BlogPage() {
  'use cache';
  cacheLife('minutes'); // Revalidate posts frequently for ISR

  const posts = await getPosts();

  return (
    <main className="section" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Journal</span>
          <h1 style={{ marginBottom: '1.5rem' }}>Insights & Stories</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Behind the scenes, filmmaking techniques, and stories from our alumni
            and industry professionals in Nepal.
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p>No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="blog-card">
                {post.coverImage ? (
                  <div className="blog-card-image-wrap">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="blog-card-image"
                    />
                  </div>
                ) : (
                  <div className="blog-card-image-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>ZYAMARU</span>
                  </div>
                )}
                
                <div className="blog-card-content">
                  <span className="blog-card-date">
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Recent'}
                  </span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.description && (
                    <p className="blog-card-excerpt">{post.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
