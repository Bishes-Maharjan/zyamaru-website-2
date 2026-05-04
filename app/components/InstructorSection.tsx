'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function InstructorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
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

          {/* Instructor silhouette/abstract visual */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '70%',
              background: 'radial-gradient(ellipse at center bottom, rgba(212, 168, 83, 0.08) 0%, transparent 70%)',
              zIndex: 1,
            }}
          />

          {/* Camera icon */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '4rem',
              opacity: 0.15,
              zIndex: 1,
            }}
          >
            🎥
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
              12+
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
            Taught by <span style={{ color: 'var(--color-amber)' }}>Award-Winning</span> Filmmakers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}
          >
            Our lead instructor has worked on over 40 feature films, 200+ commercial
            projects, and has trained the next generation of Nepal&apos;s most talented
            cinematographers. With experience spanning Bollywood, Kollywood, and
            international documentary work.
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
            {[
              '🏆 National Film Award Winner',
              '🎬 40+ Feature Films',
              '📺 200+ Commercials',
              '🌍 International Projects',
            ].map((cred) => (
              <span
                key={cred}
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
                {cred}
              </span>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem' }}
          >
            {['YouTube', 'Instagram', 'Vimeo'].map((platform) => (
              <a
                key={platform}
                href="#"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.3s ease',
                  borderBottom: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--color-amber)';
                  (e.target as HTMLElement).style.borderBottomColor = 'var(--color-amber)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--color-text-muted)';
                  (e.target as HTMLElement).style.borderBottomColor = 'transparent';
                }}
              >
                {platform}
              </a>
            ))}
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
