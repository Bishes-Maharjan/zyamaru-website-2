'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostMeta } from '@/types/notion';

interface BlogGridProps {
  posts: BlogPostMeta[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts based on active tag
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <>
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="blog-tag-filter">
          <button
            className={`blog-tag-pill${activeTag === null ? ' active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`blog-tag-pill${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p>No posts found for this tag. Try another one!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="blog-card">
              {post.coverImage ? (
                <div className="blog-card-image-wrap">
                  <Image
                    loading="eager"
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
                {post.tags.length > 0 && (
                  <div className="blog-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-card-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
