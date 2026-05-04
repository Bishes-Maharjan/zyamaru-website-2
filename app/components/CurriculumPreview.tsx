'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const modules = [
  {
    id: 1,
    title: 'Foundations of Cinematography',
    lessons: 12,
    duration: '6 hours',
    topics: [
      'Understanding the Camera System',
      'Exposure Triangle Mastery',
      'Lens Selection & Focal Lengths',
      'Frame Composition Principles',
    ],
  },
  {
    id: 2,
    title: 'Lighting for Film',
    lessons: 10,
    duration: '5 hours',
    topics: [
      'Natural vs Artificial Lighting',
      'Three-Point Lighting Setup',
      'Mood & Atmosphere Creation',
      'Working with Color Temperature',
    ],
  },
  {
    id: 3,
    title: 'Camera Movement & Blocking',
    lessons: 8,
    duration: '4.5 hours',
    topics: [
      'Dolly, Crane & Steadicam',
      'Handheld Techniques',
      'Gimbal Mastery',
      'Movement Motivation & Story',
    ],
  },
  {
    id: 4,
    title: 'Color Grading & Post-Production',
    lessons: 14,
    duration: '8 hours',
    topics: [
      'DaVinci Resolve Deep Dive',
      'Color Theory for Film',
      'Look Development (LUTs)',
      'Matching Shots & Consistency',
    ],
  },
  {
    id: 5,
    title: 'Directing & Visual Storytelling',
    lessons: 10,
    duration: '6 hours',
    topics: [
      'Shot Lists & Storyboarding',
      'Working with Actors',
      'Visual Narrative Techniques',
      'Final Project: Short Film',
    ],
  },
];

export default function CurriculumPreview() {
  const [openModule, setOpenModule] = useState<number | null>(1);

  return (
    <section
      id="curriculum"
      className="section"
      style={{
        background: 'var(--color-bg-elevated)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div className="section-label">Curriculum</div>
        </ScrollReveal>

        <TextReveal text="What You'll Master" as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '500px',
              marginTop: '1rem',
              marginBottom: '3rem',
              fontSize: '1.05rem',
            }}
          >
            A comprehensive, structured path from beginner to professional cinematographer.
          </p>
        </ScrollReveal>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {modules.map((module, i) => (
            <ScrollReveal key={module.id} delay={i * 0.08}>
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${openModule === module.id ? 'var(--color-border-amber)' : 'var(--color-border)'}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--color-amber)',
                        width: '2rem',
                      }}
                    >
                      {String(module.id).padStart(2, '0')}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {module.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {module.lessons} lessons • {module.duration}
                      </span>
                    </div>
                  </div>

                  <motion.span
                    animate={{ rotate: openModule === module.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '1.2rem',
                      lineHeight: 1,
                    }}
                  >
                    ▾
                  </motion.span>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {openModule === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 1.5rem 1.25rem',
                          paddingLeft: '4.5rem',
                        }}
                      >
                        <ul
                          style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                          }}
                        >
                          {module.topics.map((topic) => (
                            <li
                              key={topic}
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.85rem',
                                color: 'var(--color-text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                              }}
                            >
                              <span
                                style={{
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  background: 'var(--color-amber)',
                                  flexShrink: 0,
                                }}
                              />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#courses" className="btn-primary">
              <span>Enroll to Unlock Full Curriculum</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
