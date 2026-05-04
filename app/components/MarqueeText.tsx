'use client';

export default function MarqueeText() {
  const items = [
    'CINEMATOGRAPHY',
    '✦',
    'VISUAL STORYTELLING',
    '✦',
    'COLOR GRADING',
    '✦',
    'LIGHTING DESIGN',
    '✦',
    'CAMERA MOVEMENT',
    '✦',
    'FILM PRODUCTION',
    '✦',
    'AERIAL VIDEOGRAPHY',
    '✦',
    'POST PRODUCTION',
    '✦',
  ];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <div className="marquee-track" style={{ width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: item === '✦' ? 'var(--color-amber)' : 'var(--color-text-muted)',
              padding: '0 1.5rem',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
