'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: 'center',
        flex: '1 1 140px',
        padding: '1.5rem 1rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: 'var(--color-amber)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '2px',
        }}
      >
        <motion.span>{rounded}</motion.span>
        <span style={{ fontSize: '0.7em' }}>{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'Students Trained' },
  { value: 50, suffix: '+', label: 'Courses Available' },
  { value: 12, suffix: '', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Success Rate' },
];

export default function StatsBar() {
  return (
    <section
      style={{
        padding: '1rem var(--section-padding-x)',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0',
        }}
      >
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
