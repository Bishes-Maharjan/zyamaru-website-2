'use client';

import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--section-padding-x)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212, 168, 83, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212, 168, 83, 0.03) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* Decorative film strip left */}
      <div
        style={{
          position: 'absolute',
          left: '3%',
          top: '10%',
          bottom: '10%',
          width: '30px',
          opacity: 0.06,
          background: `repeating-linear-gradient(
            180deg,
            transparent,
            transparent 20px,
            #d4a853 20px,
            #d4a853 22px,
            transparent 22px,
            transparent 40px
          )`,
          borderLeft: '2px solid #d4a853',
          borderRight: '2px solid #d4a853',
          zIndex: 1,
        }}
      />

      {/* Decorative film strip right */}
      <div
        style={{
          position: 'absolute',
          right: '3%',
          top: '15%',
          bottom: '15%',
          width: '30px',
          opacity: 0.04,
          background: `repeating-linear-gradient(
            180deg,
            transparent,
            transparent 20px,
            #d4a853 20px,
            #d4a853 22px,
            transparent 22px,
            transparent 40px
          )`,
          borderLeft: '2px solid #d4a853',
          borderRight: '2px solid #d4a853',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '2rem',
              height: '1px',
              background: 'var(--color-amber)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-amber)',
            }}
          >
            Nepal&apos;s Premier Film Academy
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '2rem',
              height: '1px',
              background: 'var(--color-amber)',
            }}
          />
        </motion.div>

        {/* Heading */}
        <TextReveal
          text="Master the Art of Visual Storytelling"
          as="h1"
          delay={2.1}
          staggerDelay={0.06}
          className=""
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '1.5rem auto 0',
          }}
        >
          Professional cinematography &amp; videography courses taught by award-winning
          filmmakers. From Kathmandu to the world stage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2.5rem',
          }}
        >
          <a href="#courses" className="btn-primary">
            <span>Explore Courses</span>
          </a>
          <a href="#showreel" className="btn-secondary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: '0.25rem' }}
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Watch Showreel
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '30px',
            background: 'linear-gradient(180deg, var(--color-amber), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
