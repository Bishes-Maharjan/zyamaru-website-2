'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { instructors } from '../../data/instructors';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';

export default function InstructorProfile() {
  const params = useParams();
  const slug = params.name as string;
  const instructor = instructors.find((i) => i.slug === slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!instructor) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
            Instructor Not Found
          </h1>
          <Link href="/" style={{ color: 'var(--color-amber)' }}>
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
      }}
    >

      <main
        style={{
          paddingTop: '7rem',
          paddingBottom: '4rem',
          paddingLeft: 'var(--section-padding-x)',
          paddingRight: 'var(--section-padding-x)',
        }}
      >
        {/* Gold bordered wrapper */}
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            border: '1px solid var(--color-border-amber)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            background: 'rgba(212, 168, 83, 0.02)',
            position: 'relative',
          }}
        >
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: '-1px', left: '2rem', width: '3rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '-1px', right: '2rem', width: '3rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '2rem', width: '3rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '2rem', width: '3rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />

          {/* ── Hero ── */}
          <section
            style={{
              marginBottom: '3rem',
            }}
          >
            <div className="instructor-hero-grid">
              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="section-label">Instructor</div>

                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {instructor.name}
                </h1>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {instructor.expertise.map((exp) => (
                    <span
                      key={exp}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.04em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  {instructor.bio}
                </p>

                {instructor.born && (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-amber)', marginRight: '0.35rem' }}>✦</span>
                    Born {instructor.born}, Kathmandu
                  </p>
                )}
              </motion.div>

              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--color-bg), transparent 60%)',
                    zIndex: 1,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '6rem', opacity: 0.08, filter: 'grayscale(1)' }}>👤</span>
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: '1rem',
                    border: '1px solid rgba(212,168,83,0.1)',
                    borderRadius: 'var(--radius-md)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              </motion.div>
            </div>
          </section>

          {/* ── Bio & Experience ── */}
          <section
            style={{
              marginBottom: '3rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="instructor-bio-grid">
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  The Journey
                </h2>
                <div
                  style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {instructor.longBio}
                </div>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Experience
                </h2>
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.7,
                      fontSize: '0.92rem',
                    }}
                  >
                    {instructor.experience}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Award-Winning Works ── */}
          <section
            style={{
              marginBottom: '3rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '1.1rem' }}>🏆</span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: 'var(--color-amber)',
                  margin: 0,
                }}
              >
                Award-Winning Films
              </h2>
            </div>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              Recognized at international film festivals worldwide
            </p>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {instructor.filmography
                .filter((f) => f.awards && f.awards.length > 0)
                .map((film, idx) => (
                  <motion.div
                    key={film.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.12, duration: 0.6 }}
                    className="award-card"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-lg)',
                      background: 'linear-gradient(135deg, rgba(212,168,83,0.06) 0%, rgba(10,10,10,0.95) 100%)',
                      border: '1px solid var(--color-border-amber)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.4s var(--ease-out-expo), box-shadow 0.4s ease',
                    }}
                  >
                    {/* Subtle glow accent */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--color-amber), transparent)',
                        opacity: 0.4,
                      }}
                    />

                    {/* Year badge */}
                    {film.year && (
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.6rem',
                          background: 'rgba(212,168,83,0.12)',
                          border: '1px solid rgba(212,168,83,0.25)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: 'var(--color-amber)',
                          marginBottom: '0.75rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {film.year}
                      </div>
                    )}

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: '0 0 0.3rem 0',
                      }}
                    >
                      {film.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.82rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {film.role}
                    </p>

                    {/* Awards list */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: film.link ? '1rem' : 0,
                      }}
                    >
                      {film.awards!.map((award, i) => (
                        <span
                          key={i}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.72rem',
                            color: 'var(--color-amber-light)',
                            background: 'rgba(212,168,83,0.08)',
                            padding: '0.3rem 0.7rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(212,168,83,0.15)',
                            lineHeight: 1.3,
                          }}
                        >
                          <span style={{ fontSize: '0.6rem' }}>★</span>
                          {award}
                        </span>
                      ))}
                    </div>

                    {/* Watch button */}
                    {film.link && (
                      <a
                        href={film.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.78rem',
                          display: 'inline-flex',
                          gap: '0.4rem',
                        }}
                      >
                        <span>▶ Watch Film</span>
                      </a>
                    )}
                  </motion.div>
                ))}
            </div>
          </section>

          {/* ── Other Works ── */}
          <section
            style={{
              marginBottom: '3rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                color: 'var(--color-text-primary)',
                marginBottom: '0.35rem',
              }}
            >
              More Works
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              Documentaries, commercials & music videos
            </p>

            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {instructor.filmography
                .filter((f) => !f.awards && f.link)
                .map((film, idx) => (
                  <motion.div
                    key={film.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: Math.min(idx * 0.04, 0.3), duration: 0.4 }}
                    className="film-card"
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      transition: 'border-color 0.3s ease, background 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {film.year && (
                        <span
                          style={{
                            color: 'var(--color-amber)',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            fontFamily: 'monospace',
                          }}
                        >
                          {film.year}
                        </span>
                      )}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          margin: 0,
                        }}
                      >
                        {film.title}
                      </h3>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
                        — {film.role}
                      </span>
                    </div>

                    <a
                      href={film.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: 'var(--color-amber)',
                        flexShrink: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget).style.opacity = '0.7'; }}
                      onMouseLeave={(e) => { (e.currentTarget).style.opacity = '1'; }}
                    >
                      Watch ↗
                    </a>
                  </motion.div>
                ))}
            </div>
          </section>

          {/* ── Back ── */}
          <div
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
            }}
          >
            <Link href="/" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.7rem 1.5rem' }}>
              ← Back to Home
            </Link>
          </div>

        </div>{/* end gold border wrapper */}
      </main>

      <Footer />

      <style jsx>{`
        .instructor-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
        }
        .instructor-bio-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2.5rem;
        }
        .award-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(212, 168, 83, 0.15);
        }
        .film-card:hover {
          border-color: var(--color-border-amber) !important;
          background: var(--color-bg-card-hover) !important;
        }
        @media (max-width: 768px) {
          .instructor-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .instructor-bio-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
