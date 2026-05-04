'use client';

import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Director, Kathmandu Films',
    quote: 'ZYAMARU completely transformed my understanding of light and composition. I went from a hobby shooter to directing my first feature film within a year.',
    rating: 5,
    course: 'Cinematic Masterclass',
  },
  {
    name: 'Priya Thapa',
    role: 'Freelance Cinematographer',
    quote: 'The hands-on approach is what sets this apart. Real cameras, real sets, real projects. I was hired by a production house before I even finished the course.',
    rating: 5,
    course: 'Advanced Color Grading',
  },
  {
    name: 'Bikash Gurung',
    role: 'Documentary Filmmaker',
    quote: 'Learning drone cinematography here opened up an entirely new career path. The instructors don\'t just teach technique — they teach vision.',
    rating: 5,
    course: 'Drone Cinematography',
  },
  {
    name: 'Suman Maharjan',
    role: 'Wedding Cinematographer',
    quote: 'I tripled my pricing after completing the masterclass. The quality of my work before vs. after is incomparable. Best investment I\'ve ever made.',
    rating: 5,
    course: 'Cinematic Masterclass',
  },
  {
    name: 'Anita Rai',
    role: 'Content Creator',
    quote: 'From YouTube videos to cinematic brand films — ZYAMARU showed me the difference between recording and creating. The community alone is worth it.',
    rating: 5,
    course: 'Documentary Filmmaking',
  },
  {
    name: 'Dipesh Shrestha',
    role: 'Music Video Director',
    quote: 'The curriculum is world-class. I\'ve seen online courses from the US and Europe — this matches or exceeds them, and it\'s taught with Nepal\'s context in mind.',
    rating: 5,
    course: 'Camera Movement & Blocking',
  },
];

export default function TestimonialSection() {
  // Double the testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem' }}>
        <ScrollReveal>
          <div className="section-label">Testimonials</div>
        </ScrollReveal>

        <TextReveal text="Stories From Our Graduates" as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '500px',
              marginTop: '1rem',
              fontSize: '1.05rem',
            }}
          >
            Real results from real students. Here&apos;s what they have to say.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee Row 1 (left) */}
      <div
        style={{
          overflow: 'hidden',
          marginBottom: '1rem',
          maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            animation: 'marquee 40s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (right) */}
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            animation: 'marquee 45s linear infinite reverse',
            width: 'max-content',
          }}
        >
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  rating,
  course,
}: {
  name: string;
  role: string;
  quote: string;
  rating: number;
  course: string;
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: '380px',
        padding: '1.5rem',
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-amber)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Stars */}
      <div style={{ marginBottom: '0.75rem' }}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} style={{ color: 'var(--color-amber)', fontSize: '0.85rem' }}>
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          margin: '0 0 1.25rem 0',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1rem',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-amber), var(--color-amber-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#0a0a0a',
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {role} • {course}
          </div>
        </div>
      </div>
    </div>
  );
}
