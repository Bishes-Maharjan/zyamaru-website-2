'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { instructors } from '../data/instructors';

export default function InstructorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const instructor = instructors[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return instructors.length - 1;
      if (next >= instructors.length) return 0;
      return next;
    });
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const yearsInFilm = instructor.born
    ? new Date().getFullYear() - parseInt(instructor.born) - 18
    : null;

  return (
    <section
      id="instructor"
      className="section"
      ref={ref}
      style={{
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <ScrollReveal>
            <div className="section-label">Your Instructors</div>
          </ScrollReveal>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              lineHeight: 1.2,
            }}
          >
            Learn From <span style={{ color: 'var(--color-amber)' }}>Industry Experts</span>
          </motion.h2>
        </div>

        {/* Instructor Slide with Flanking Arrows */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Left Arrow */}
          {instructors.length > 1 && (
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous instructor"
              style={{
                flexShrink: 0,
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                background: 'rgba(10, 10, 10, 0.6)',
                backdropFilter: 'blur(10px)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                transition: 'all 0.3s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-amber)';
                e.currentTarget.style.color = 'var(--color-amber)';
                e.currentTarget.style.background = 'rgba(212, 168, 83, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.background = 'rgba(10, 10, 10, 0.6)';
              }}
            >
              ←
            </button>
          )}

          {/* Slide Content — draggable */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={instructor.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                /* ── Drag to swipe ─────────────────────────────── */
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  // Trigger on swipe velocity OR significant offset
                  if (info.velocity.x < -300 || info.offset.x < -80) {
                    paginate(1);
                  } else if (info.velocity.x > 300 || info.offset.x > 80) {
                    paginate(-1);
                  }
                }}
                style={{ cursor: 'grab' }}
                whileDrag={{ cursor: 'grabbing' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'clamp(2rem, 5vw, 5rem)',
                    alignItems: 'center',
                    userSelect: 'none', // prevent text selection while dragging
                  }}
                >
                  {/* Image Side */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/5',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: `
                        linear-gradient(135deg, rgba(212, 168, 83, 0.1) 0%, rgba(10, 10, 10, 0.9) 100%),
                        linear-gradient(45deg, #1a1a1a, #2a2a2a)
                      `,
                    }}
                  >
                    {/* Decorative frame */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '1rem',
                        border: '1px solid rgba(212, 168, 83, 0.15)',
                        borderRadius: 'var(--radius-md)',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Instructor visual */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }}
                    >
                      {instructor.image ? (
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                          style={{ objectFit: 'cover', pointerEvents: 'none' }}
                          draggable={false}
                        />
                      ) : (
                        <div
                          style={{
                            fontSize: '8rem',
                            opacity: 0.1,
                            filter: 'grayscale(1)',
                          }}
                        >
                          👤
                        </div>
                      )}
                    </div>

                    {/* Experience badge */}
                    {yearsInFilm && yearsInFilm > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1.5rem',
                          right: '1.5rem',
                          background: 'rgba(10, 10, 10, 0.8)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid var(--color-border-amber)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem 1.25rem',
                          zIndex: 3,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--color-amber)',
                            lineHeight: 1,
                          }}
                        >
                          {yearsInFilm}+
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-secondary)',
                            letterSpacing: '0.05em',
                            marginTop: '0.25rem',
                          }}
                        >
                          Years in Film
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                      }}
                    >
                      <span style={{ color: 'var(--color-amber)' }}>{instructor.name}</span>
                    </h3>

                    <p
                      style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}
                    >
                      {instructor.bio}
                    </p>

                    {/* Credentials */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '2rem',
                      }}
                    >
                      {instructor.expertise.map((exp) => (
                        <span
                          key={exp}
                          style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Link href={`/instructor/${instructor.slug}`} className="btn-primary">
                        <span>Learn More</span>
                      </Link>

                      {/* Social Links */}
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {instructor.socials && Object.entries(instructor.socials).map(([name, social]) => {
                          return (social && (
                            <a
                              key={name}
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                background: social.color,
                                outline: '1px solid transparent',
                                outlineOffset: '2px',
                                transition: 'outline-color 0.25s ease',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.outlineColor = '#D4A853'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.outlineColor = 'transparent'; }}
                            >
                              {social.icon}
                            </a>
                          ))
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          {instructors.length > 1 && (
            <button
              onClick={() => paginate(1)}
              aria-label="Next instructor"
              style={{
                flexShrink: 0,
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                background: 'rgba(10, 10, 10, 0.6)',
                backdropFilter: 'blur(10px)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                transition: 'all 0.3s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-amber)';
                e.currentTarget.style.color = 'var(--color-amber)';
                e.currentTarget.style.background = 'rgba(212, 168, 83, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.background = 'rgba(10, 10, 10, 0.6)';
              }}
            >
              →
            </button>
          )}
        </div>

        {/* Dots Indicator + swipe hint */}
        {instructors.length > 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {instructors.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  aria-label={`Go to instructor ${idx + 1}`}
                  style={{
                    width: activeIndex === idx ? '2.5rem' : '0.5rem',
                    height: '0.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: activeIndex === idx ? 'var(--color-amber)' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
              swipe or drag to navigate
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
