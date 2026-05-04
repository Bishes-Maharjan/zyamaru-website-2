'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const features = [
  {
    icon: '🎬',
    title: 'Industry-Grade Equipment',
    description: 'Train with RED, ARRI, and Sony cinema cameras. The same gear used on Hollywood sets.',
    gridArea: '1 / 1 / 2 / 2',
  },
  {
    icon: '🏔️',
    title: 'Nepal as Your Canvas',
    description: 'From the peaks of Everest to the streets of Kathmandu — shoot in the most cinematic locations on Earth.',
    gridArea: '1 / 2 / 2 / 4',
  },
  {
    icon: '🎓',
    title: 'Certified Programs',
    description: 'Earn internationally recognized certificates that open doors across the film industry.',
    gridArea: '2 / 1 / 3 / 3',
  },
  {
    icon: '🤝',
    title: 'Community of 500+ Filmmakers',
    description: 'Join an active network of creators, collaborate on projects, and grow together.',
    gridArea: '2 / 3 / 3 / 4',
  },
  {
    icon: '💼',
    title: 'Job Placement Support',
    description: 'Direct connections to production houses, agencies, and international projects.',
    gridArea: '3 / 1 / 4 / 2',
  },
  {
    icon: '🎞️',
    title: 'Lifetime Access',
    description: 'Once enrolled, access all course materials and future updates forever. Learn at your own pace.',
    gridArea: '3 / 2 / 4 / 4',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="section"
      ref={ref}
      style={{
        background: 'var(--color-bg-elevated)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div className="section-label">Why Choose Us</div>
        </ScrollReveal>

        <TextReveal text="Built Different. Built for Filmmakers." as="h2" />

        <ScrollReveal delay={0.2}>
          <p style={{ maxWidth: '500px', marginTop: '1rem', marginBottom: '3rem', fontSize: '1.05rem' }}>
            We don&apos;t just teach theory — we immerse you in the craft.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, auto)',
            gap: '1rem',
          }}
          className="bento-grid"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridArea: feature.gridArea,
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                border: '1px solid var(--color-border)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{
                borderColor: 'rgba(212, 168, 83, 0.2)',
                y: -4,
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>
                {feature.icon}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-grid > * {
            grid-area: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
