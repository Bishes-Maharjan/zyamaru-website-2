'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function CareerPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const structuralPositions = [
        "Direction & Screenwriting",
        "Cinematography & Lighting",
        "Post-Production & Grading",
        "Technical Drone Operations"
    ];

    return (
        <section
            id="career"
            className="section"
            ref={ref}
            style={{
                background: 'var(--color-bg)',
                overflow: 'hidden',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                padding: 'clamp(4rem, 8vw, 7rem) 0'
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <div style={{ marginBottom: '3.5rem' }}>
                    <ScrollReveal>
                        <div className="section-label">Shape the Industry</div>
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
                        We Don’t Just Sell Courses. <br />
                        We Build <span style={{ color: 'var(--color-amber)' }}>Filmmakers</span>.
                    </motion.h2>
                </div>

                {/* Core Layout Grid */}
                <div
                    className="career-preview-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'clamp(2.5rem, 5vw, 5rem)',
                        alignItems: 'center',
                    }}
                >
                    {/* Visual Framed Statement Side */}
                    <div
                        style={{
                            position: 'relative',
                            aspectRatio: '4/3',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            background: `
                linear-gradient(135deg, rgba(212, 168, 83, 0.05) 0%, rgba(10, 10, 10, 0.95) 100%),
                linear-gradient(45deg, #121212, #1a1a1a)
              `,
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 'clamp(1.5rem, 4vw, 3rem)'
                        }}
                    >
                        {/* Decorative frame inner overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '1rem',
                                border: '1px solid rgba(212, 168, 83, 0.12)',
                                borderRadius: 'var(--radius-md)',
                                zIndex: 2,
                                pointerEvents: 'none',
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 3 }}>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                                    color: 'var(--color-text-primary)',
                                    lineHeight: 1.4,
                                    marginBottom: '1rem'
                                }}
                            >
                                Now Expanding the <br />
                                <span style={{ color: 'var(--color-amber)' }}>Instructor Guild</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                Zyamaru functions as a production-standard environment. We need practitioners active on real sets to guide the next generation of filmmakers through uncompromising technical execution.
                            </p>
                        </div>
                    </div>

                    {/* Core Descriptive Content Side */}
                    <div>
                        <h3
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                                marginBottom: '1.25rem',
                                lineHeight: 1.3,
                                color: 'var(--color-text-primary)'
                            }}
                        >
                            Transfer Authentic On-Set Experience
                        </h3>

                        <p style={{ fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                            We are scaling instructional capabilities for specialized workshops, masterclasses, and structural curricula. If you have verified film industry expertise, your craft belongs in our academy layout.
                        </p>

                        {/* Targeted Disciplines Badges */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.75rem',
                                marginBottom: '2.5rem',
                            }}
                        >
                            {structuralPositions.map((dept) => (
                                <span
                                    key={dept}
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
                                    {dept}
                                </span>
                            ))}
                        </div>

                        {/* Main CTA Trigger Navigation */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/career" className="btn-primary">
                                <span>Learn More & Apply</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .career-preview-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </section>
    );
}