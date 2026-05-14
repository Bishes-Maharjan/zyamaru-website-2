'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { courses } from '../../data/courses';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import EnrollButton from '../../components/EnrollButton';

export default function CourseDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find((c) => c.slug === slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Course Not Found</h1>
          <Link href="/" style={{ color: 'var(--color-amber)' }}>Go back home</Link>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>

      <main style={{ paddingTop: '8rem', paddingBottom: '6rem', paddingLeft: 'var(--section-padding-x)', paddingRight: 'var(--section-padding-x)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', border: '1px solid var(--color-border-amber)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.5rem, 5vw, 4rem)', background: 'rgba(212, 168, 83, 0.02)', position: 'relative' }}>
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />

          {/* Header */}
          <section style={{ marginBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(212,168,83,0.1)', border: '1px solid var(--color-border-amber)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-amber)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {course.level}
                </span>
                {course.isUpcoming && (
                  <span style={{ padding: '0.4rem 0.8rem', background: 'var(--color-amber)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Upcoming
                  </span>
                )}
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                {course.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Instructor</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.instructor}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Duration</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.duration}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{course.isExpectedPrice ? 'Expected Price' : 'Price'}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-amber)' }}>{course.price}</span>
                    {course.originalPrice && <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{course.originalPrice}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Description */}
          <section style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Overview</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', maxWidth: '800px' }}>
              {course.description}
            </p>
          </section>

          {/* Curriculum */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '2rem' }}>Curriculum</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {course.curriculum.map((module, idx) => (
                <motion.div
                  key={module.chapter}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-amber)', marginBottom: '1rem' }}>{module.chapter}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {module.topics.map((topic) => (
                      <li key={topic} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                        <span style={{ width: '6px', height: '6px', background: 'var(--color-amber)', borderRadius: '50%' }} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Learning Outcomes */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>What You'll Learn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1.5rem', background: 'rgba(212,168,83,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,168,83,0.1)' }}>
                  <span style={{ fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            {course.isUpcoming ? (
              <div style={{ padding: '2rem', border: '2px dashed var(--color-border-amber)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Enrollment Opening Soon</h3>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>Get notified as soon as this course becomes available.</p>
                <EnrollButton 
                  course={course.category} 
                  style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
                >
                  Join the Waitlist
                </EnrollButton>
              </div>
            ) : (
              <EnrollButton 
                course={course.category} 
                style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
              >
                Enroll Now
              </EnrollButton>
            )}
            <div style={{ marginTop: '2rem' }}>
              <Link href="/#courses" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'underline' }}>Back to all courses</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
