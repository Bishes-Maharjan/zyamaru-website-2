'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const pillars = [
  {
    icon: '🎬',
    title: 'Hands-On Learning',
    description:
      'Every concept is practiced on real camera systems in real-world shooting environments. We believe craft is built through doing, not watching.',
  },
  {
    icon: '🏔️',
    title: 'Nepal as Your Canvas',
    description:
      'From the ancient streets of Kathmandu to the peaks of the Himalayas — our location is unlike any other film school in the world. We shoot where it matters.',
  },
  {
    icon: '🎓',
    title: 'Industry-Led Curriculum',
    description:
      'Courses are designed by working professionals with real production credits. What you learn here reflects exactly what the industry demands.',
  },
  {
    icon: '🤝',
    title: 'Small Cohorts, Deep Mentorship',
    description:
      'We limit our batch sizes deliberately. Every student gets focused attention, personal feedback, and a direct relationship with their instructor.',
  },
  {
    icon: '💼',
    title: 'Career-Ready from Day One',
    description:
      'Portfolio building, industry connections, and practical skills are built into every program. You graduate with work that speaks for itself.',
  },
  {
    icon: '🎞️',
    title: 'A Community for Life',
    description:
      'Joining ZYAMARU means joining a network of filmmakers, storytellers, and visual artists who continue to collaborate long after graduation.',
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
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* ── Header ─────────────────────────────── */}
        <ScrollReveal>
          <div className="section-label">About ZYAMARU Films Academy</div>
        </ScrollReveal>

        <TextReveal text="We Don't Teach Film. We Make Filmmakers." as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '720px',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
            }}
          >
            ZYAMARU Films Academy was born in Kathmandu from a simple belief: Nepal deserves a world-class
            filmmaking institution that speaks its own cinematic language. We are not a generalist media
            school. We are a focused, craft-driven academy dedicated entirely to the art and technique of
            visual storytelling.
          </p>
          <p
            style={{
              maxWidth: '720px',
              marginBottom: '3.5rem',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
            }}
          >
            Our programs are short, intensive, and built around real production work. Students don&apos;t
            spend months in theory — they pick up a camera on day one. Whether you&apos;re learning
            cinematography fundamentals, mastering advanced color grading in DaVinci Resolve, documenting
            Nepal&apos;s living culture, or taking to the sky with a drone, every course is taught by
            practitioners who have done exactly that work professionally.
          </p>
        </ScrollReveal>

        {/* ── Why Choose Us Grid ─────────────────── */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(212, 168, 83, 0.45)' }}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  transition: 'border-color 0.3s ease',
                  cursor: 'default',
                  minWidth: 0,
                }}
              >
                <span style={{ fontSize: '1.9rem', display: 'block', marginBottom: '1rem' }}>
                  {pillar.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.6rem',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Closing statement ──────────────────── */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}
              >
                &ldquo;Cinema is Nepal&apos;s story waiting to be told by Nepali hands, Nepali eyes, and
                Nepali voices.&rdquo;
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                — ZYAMARU Films Academy, Kathmandu
              </p>
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              We are based in Tahachal, Kathmandu, and operate in-person with select hybrid modules. Our
              studio is equipped with professional cinema rigs, color grading workstations, and drone
              systems — all available to enrolled students. We are small by design, and rigorous by choice.
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
