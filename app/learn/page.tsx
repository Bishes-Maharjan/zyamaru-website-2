import React from 'react';
import Link from 'next/link';
import { chaptersByPart, PARTS } from './_content/chapters';

export const metadata = {
  title: 'Interactive Photography Course | ZYAMARU',
  description: 'Master your camera with interactive visual playgrounds. Learn exposure, focus, light and composition.',
};

export default function LearnIndexPage() {
  const partsMap = chaptersByPart();

  return (
    <div>
      {/* Hero Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 8vh, 6rem)',
        paddingTop: '2rem',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 1rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(212, 168, 83, 0.1)',
          border: '1px solid rgba(212, 168, 83, 0.2)',
          color: 'var(--color-amber)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          marginBottom: '2rem',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-amber)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }} />
          Interactive Masterclass
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          color: 'var(--color-text-primary)',
        }}>
          Master Your Camera.<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--color-amber-light), var(--color-amber), var(--color-amber-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Visually.
          </span>
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '640px',
          margin: '0 auto',
        }}>
          Most photography courses give you walls of text. We give you a virtual camera
          and interactive playgrounds. See exactly how every setting changes the
          image, the moment you change it.
        </p>
      </header>

      {/* Course Parts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 8vh, 5rem)' }}>
        {PARTS.map((part) => {
          const chapters = partsMap.get(part.part) || [];
          return (
            <section key={part.part} id={`part-${part.part}`} style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              borderRadius: '1rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-elevated)',
            }}>
              {/* Part Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '1.25rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--color-amber)',
                  opacity: 0.25,
                }}>
                  0{part.part}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.2,
                  paddingBottom: '0.25rem',
                }}>
                  {part.title}
                </h2>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.75rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}>
                {part.description}
              </p>

              {/* Chapters Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: '1rem',
              }}>
                {chapters.map((ch) => (
                  <Link
                    key={ch.slug}
                    href={ch.available ? `/learn/${ch.slug}` : '#'}
                    className={ch.available ? 'chapter-card' : 'chapter-card-disabled'}
                    style={{
                      display: 'block',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: ch.available ? 'var(--color-bg-card)' : 'var(--color-bg)',
                      opacity: ch.available ? 1 : 0.45,
                      cursor: ch.available ? 'pointer' : 'not-allowed',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Chapter badge row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-amber)',
                        backgroundColor: 'rgba(212, 168, 83, 0.1)',
                        border: '1px solid rgba(212, 168, 83, 0.2)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '0.375rem',
                      }}>
                        {ch.number}
                      </span>
                      {!ch.available && (
                        <span style={{
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--color-text-muted)',
                          backgroundColor: 'var(--color-bg-elevated)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '0.375rem',
                          border: '1px solid var(--color-border)',
                        }}>
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--color-amber)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}>
                      {ch.title}
                    </h3>

                    {/* Summary */}
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {ch.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
