'use client';

import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';
import CourseCard from './CourseCard';

const courses = [
  {
    title: 'Cinematic Masterclass: From Vision to Screen',
    instructor: 'Rajesh Hamal',
    price: 'Rs. 15,000',
    originalPrice: 'Rs. 25,000',
    rating: 4.9,
    students: '1.2k',
    duration: '42 hours',
    level: 'Beginner to Advanced',
    badge: 'Bestseller' as const,
    image: 'rgba(212, 168, 83, 0.15)',
  },
  {
    title: 'Documentary Filmmaking: Telling Nepal\'s Stories',
    instructor: 'Srijana Basnet',
    price: 'Rs. 12,000',
    originalPrice: 'Rs. 18,000',
    rating: 4.8,
    students: '850',
    duration: '28 hours',
    level: 'Intermediate',
    badge: 'New' as const,
    image: 'rgba(96, 165, 250, 0.12)',
  },
  {
    title: 'Advanced Color Grading & Visual Effects',
    instructor: 'Aayush Shrestha',
    price: 'Rs. 18,000',
    rating: 4.7,
    students: '620',
    duration: '35 hours',
    level: 'Advanced',
    image: 'rgba(168, 85, 247, 0.12)',
  },
  {
    title: 'Drone Cinematography & Aerial Storytelling',
    instructor: 'Binod Tamang',
    price: 'Rs. 20,000',
    originalPrice: 'Rs. 30,000',
    rating: 4.9,
    students: '430',
    duration: '24 hours',
    level: 'Intermediate',
    badge: 'Popular' as const,
    image: 'rgba(74, 222, 128, 0.1)',
  },
];

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
          <div className="section-label">Featured Courses</div>
        </ScrollReveal>

        <TextReveal text="Learn From the Best in Nepal" as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '550px',
              marginTop: '1rem',
              marginBottom: '3rem',
              fontSize: '1.05rem',
            }}
          >
            Industry-standard curriculum designed by award-winning filmmakers.
            Hands-on projects, real equipment, real results.
          </p>
        </ScrollReveal>

        {/* Course Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {courses.map((course, i) => (
            <CourseCard key={course.title} {...course} index={i} />
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--color-amber)',
                letterSpacing: '0.05em',
                borderBottom: '1px solid rgba(212, 168, 83, 0.3)',
                paddingBottom: '0.25rem',
                transition: 'border-color 0.3s ease',
              }}
            >
              View All 50+ Courses →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
