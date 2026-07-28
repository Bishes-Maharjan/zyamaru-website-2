import { cacheLife } from 'next/cache';
import { getPosts } from '@/lib/notion/getPosts';
import BlogGrid from './BlogGrid';
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
          <span className="section-label" style={{ justifyContent: 'center' }}>Blog</span>
          <h1 style={{ marginBottom: '1.5rem' }}>Insights &amp; Stories</h1>
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
          <BlogGrid posts={posts} />
        )}
      </div>
    </main>
  );
}
