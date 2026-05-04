'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 12vh, 8rem) var(--section-padding-x)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div
        className="gradient-animate"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(212,168,83,0.08) 0%, rgba(10,10,10,1) 25%, rgba(212,168,83,0.05) 50%, rgba(10,10,10,1) 75%, rgba(212,168,83,0.08) 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '1.5rem' }}>
          Start Your Journey Today
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem' }}>
          Ready to Tell <span style={{ color: 'var(--color-amber)' }}>Your Story</span>?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Join 500+ filmmakers who transformed their careers with ZYAMARU. Limited seats available for the next cohort.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#courses" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            <span>Explore Courses</span>
          </a>
          <a href="#" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Book a Free Consultation
          </a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1.5rem' }}>
          Next cohort starts June 2026 • Only 25 seats remaining
        </motion.p>
      </div>
    </section>
  );
}
