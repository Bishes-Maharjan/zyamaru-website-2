'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { instructors } from '../data/instructors';

export default function InstructorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // For now, we display the first instructor (Amar Maharjan)
  // In a more complex site, this could be a map over instructors
  const instructor = instructors[0];

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
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
        }}
        className="instructor-grid"
      >
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            aspectRatio: '3/4',
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
                style={{ objectFit: 'cover' }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
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
              9+
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
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <div>
          <ScrollReveal>
            <div className="section-label">Your Instructor</div>
          </ScrollReveal>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Taught by <span style={{ color: 'var(--color-amber)' }}>{instructor.name}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}
          >
            {instructor.bio}
          </motion.p>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
          >
            <Link href={`/instructor/${instructor.slug}`} className="btn-primary">
              <span>Learn More</span>
            </Link>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {instructor.socials && Object.entries(instructor.socials).map(([platform, link]) => (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--color-amber)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--color-text-muted)';
                  }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .instructor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
