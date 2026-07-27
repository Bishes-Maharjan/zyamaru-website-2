'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';

interface NotionContentProps {
  content: string;
}

// Custom YouTube embed component for Markdown
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function NotionContent({ content }: NotionContentProps) {
  return (
    <div className="notion-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt }) {
            if (!src) return null;
            const imgSrc = src as string;
            return (
              <span style={{ display: 'block', position: 'relative', width: '100%', height: 'auto', minHeight: '300px' }}>
                <Image
                  loading="eager"
                  src={imgSrc}
                  alt={alt || 'Blog Image'}
                  width={800}
                  height={500}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  unoptimized={imgSrc.startsWith('/api/notion-image')} // Optimize via the proxy/Notion
                />
              </span>
            );
          },
          iframe({ node, ...props }) {
            return (
              <div className="notion-video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%', maxWidth: '100%', borderRadius: '0.75rem', margin: '2rem 0' }}>
                <iframe
                  {...(props as any)}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                />
              </div>
            );
          },
          a({ href, children }) {
            // Check if link is a YouTube video
            if (href) {
              const ytId = getYouTubeId(href);
              if (ytId && children?.toString().includes(href)) {
                return (
                  <div className="notion-video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%', maxWidth: '100%', borderRadius: '0.75rem', margin: '2rem 0' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    ></iframe>
                  </div>
                );
              }
            }
            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
