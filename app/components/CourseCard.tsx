'use client';

import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  instructor: string;
  price: string;
  originalPrice?: string;
  rating: number;
  students: string;
  duration: string;
  level: string;
  badge?: string;
  image: string;
  index: number;
}

export default function CourseCard({
  title,
  instructor,
  price,
  originalPrice,
  rating,
  students,
  duration,
  level,
  badge,
  image,
  index,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--color-border-amber)';
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,168,83,0.08)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--color-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${image}, #1a1a1a)`,
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1,
          }}
        />

        {/* Duration badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            zIndex: 2,
          }}
        >
          {duration}
        </div>

        {/* Badge */}
        {badge && (
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              background: badge === 'Bestseller'
                ? 'linear-gradient(135deg, var(--color-amber), var(--color-amber-dark))'
                : badge === 'New'
                  ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                  : 'linear-gradient(135deg, #60a5fa, #3b82f6)',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: '#0a0a0a',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              zIndex: 2,
            }}
          >
            {badge}
          </div>
        )}

        {/* Play icon on hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
          }}
          className="course-play-overlay"
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--color-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a0a0a">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        {/* Level */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-amber)',
          }}
        >
          {level}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>

        {/* Instructor */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            margin: '0 0 0.75rem 0',
          }}
        >
          by {instructor}
        </p>

        {/* Rating & Students */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'var(--color-amber)', fontSize: '0.85rem' }}>★</span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              {rating}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}
          >
            ({students} students)
          </span>
        </div>

        {/* Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {price}
          </span>
          {originalPrice && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'line-through',
              }}
            >
              {originalPrice}
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        div:hover .course-play-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
}
