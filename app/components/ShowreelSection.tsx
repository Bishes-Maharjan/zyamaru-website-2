'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import VideoModal from './VideoModal';

export default function ShowreelSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      <section
        id="showreel"
        ref={ref}
        className="letterbox"
        style={{
          position: 'relative',
          height: '70vh',
          minHeight: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setIsModalOpen(true)}
        data-cursor="pointer"
      >
        {/* Background with Ken Burns */}
        <div
          className="ken-burns"
          style={{
            position: 'absolute',
            inset: '-5%',
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(212, 168, 83, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(100, 80, 200, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, #0f0f0f 0%, #1a1510 50%, #0f0f0f 100%)
            `,
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
            zIndex: 3,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            textAlign: 'center',
          }}
        >
          {/* Play Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pulse-glow"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(212, 168, 83, 0.15)',
              border: '2px solid var(--color-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              scale: 1.1,
              background: 'rgba(212, 168, 83, 0.25)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-amber)">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-amber)',
              marginBottom: '0.5rem',
            }}
          >
            Watch Our Showreel
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
            }}
          >
            See What Our Students Create
          </motion.h2>
        </div>
      </section>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
