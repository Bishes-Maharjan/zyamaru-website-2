'use client';

import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';
import Link from 'next/link';

export default function FeaturedCourses() {
  return (
    <section
      id="courses"
      className="section"
      style={{
        background: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div className="section-label">Academy Programs</div>
        </ScrollReveal>

        <TextReveal text="Learn From the Best in Nepal" as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '550px',
              marginTop: '1rem',
              marginBottom: '3rem',
              fontSize: '1.05rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            Industry-standard curriculum designed by award-winning filmmakers.
            Hands-on projects, real equipment, real results.
          </p>
        </ScrollReveal>

        {/* Course Grid */}
        <div
          className="course-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {courses.map((course, i) => (
            <Link
              key={course.id}
              href={`/course/${course.slug}`}
              style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}
            >
              <CourseCard {...course} index={i} />
            </Link>
          ))}
        </div>

        <style jsx>{`
          .course-grid {
            grid-auto-rows: 480px;
          }
          @media (max-width: 1024px) {
            .course-grid {
              grid-auto-rows: 460px;
            }
          }
          @media (max-width: 768px) {
            .course-grid {
              grid-template-columns: 1fr 1fr !important;
              grid-auto-rows: auto;
              gap: 1rem !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
