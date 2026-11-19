'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { courses } from '../../data/courses';
import Footer from '../../components/Footer';
import EnrollButton from '../../components/EnrollButton';

export default function CourseDetail({ slug }: { slug: string }) {
  const course = courses.find((c) => c.slug === slug);
  const [mounted, setMounted] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const expandAll = () => {
    if (course?.days) {
      setExpandedDays(new Set(course.days.map((d) => d.day)));
    }
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

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

  // Unavailable course — Coming Soon
  if (!course.available) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
        <main style={{ paddingTop: '8rem', paddingBottom: '6rem', paddingLeft: 'var(--section-padding-x)', paddingRight: 'var(--section-padding-x)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', border: '1px solid var(--color-border-amber)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.5rem, 5vw, 4rem)', background: 'rgba(212, 168, 83, 0.02)', position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ padding: '0.4rem 0.8rem', background: 'var(--color-amber)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Coming Soon
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                {course.title}
              </h1>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Instructor</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.instructor}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Duration</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.duration}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Level</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.level}</span>
                </div>
              </div>
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
              <div style={{ marginTop: '2rem' }}>
                <Link href="/#courses" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'underline' }}>Back to all courses</Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Available course — Full detail
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
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {course.instructorProfile ? (
                      <Link href={course.instructorProfile} style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>
                        {course.instructor}
                      </Link>
                    ) : (
                      course.instructor
                    )}
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Duration</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.duration}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}></span>
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

          {/* Course Info Cards */}
          {(course.whoItIsFor || course.bring || course.dailyFormat) && (
            <section style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '1.5rem' }}>
                {course.whoItIsFor && (
                  <div style={{ padding: '1.5rem', background: 'rgba(212,168,83,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,168,83,0.1)' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-amber)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Who it is for</span>
                    <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>{course.whoItIsFor}</span>
                  </div>
                )}
                {course.bring && (
                  <div style={{ padding: '1.5rem', background: 'rgba(212,168,83,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,168,83,0.1)' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-amber)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>What to bring</span>
                    <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>{course.bring}</span>
                  </div>
                )}
                {course.dailyFormat && (
                  <div style={{ padding: '1.5rem', background: 'rgba(212,168,83,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,168,83,0.1)' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-amber)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Daily format</span>
                    <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>{course.dailyFormat}</span>
                  </div>
                )}
              </div>
              {course.topicTags && course.topicTags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                  {course.topicTags.map((tag) => (
                    <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--color-amber)', fontWeight: 500 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Curriculum — Days */}
          {course.days && course.days.length > 0 && (
            <section style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: 0 }}>Curriculum</h2>
                <button
                  onClick={expandedDays.size === course.days.length ? collapseAll : expandAll}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-border-amber)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 1rem',
                    color: 'var(--color-amber)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.03em',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,168,83,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  {expandedDays.size === course.days.length ? 'Collapse all' : 'Expand all'}
                </button>
              </div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {course.days.map((dayItem, idx) => {
                  const isOpen = expandedDays.has(dayItem.day);
                  return (
                    <motion.div
                      key={dayItem.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.03 }}
                      style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      {/* Day header — always visible, clickable */}
                      <button
                        onClick={() => toggleDay(dayItem.day)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1.25rem 1.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {/* Day number badge — rectangular orange accent */}
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '3.2rem',
                          padding: '0.35rem 0.6rem',
                          background: 'rgba(234, 138, 46, 0.2)',
                          border: '1px solid rgba(234, 138, 46, 0.5)',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#ea8a2e',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          flexShrink: 0,
                        }}>
                          Day {dayItem.day}
                        </span>

                        {/* Day name */}
                        <span style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.15rem',
                          flex: 1,
                        }}>
                          {dayItem.name}
                        </span>

                        {/* Expand/collapse chevron */}
                        <span style={{
                          fontSize: '1.2rem',
                          color: 'var(--color-amber)',
                          transition: 'transform 0.2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          flexShrink: 0,
                        }}>
                          ▾
                        </span>
                      </button>

                      {/* Collapsible content */}
                      {isOpen && (
                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem', paddingTop: '1.5rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(74, 222, 128, 0.06)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid rgba(74, 222, 128, 0.5)' }}>
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(74, 222, 128, 0.9)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 600 }}>Theory</span>
                              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                                {dayItem.theory.map((item) => (
                                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                                    <span style={{ width: '6px', height: '6px', background: 'rgba(74, 222, 128, 0.7)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(96, 165, 250, 0.06)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid rgba(96, 165, 250, 0.5)' }}>
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(96, 165, 250, 0.9)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 600 }}>Practical</span>
                              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                                {dayItem.practical.map((item) => (
                                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                                    <span style={{ width: '6px', height: '6px', background: 'rgba(96, 165, 250, 0.8)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(212,168,83,0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-amber)' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-amber)', marginRight: '0.5rem' }}>Assignment:</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{dayItem.assignment}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Learning Outcomes */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>What You'll Learn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
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
