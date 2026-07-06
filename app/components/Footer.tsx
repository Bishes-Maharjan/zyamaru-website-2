'use client';

import { courses } from '../data/courses';
import LocationMap from './LocationMap';
import ScrollReveal from './ScrollReveal';

const footerLinks = {
  courses: courses.map((course) => ({
    name: course.title,
    link: `/course/${course.slug}`
  })),
  company: [
    { name: 'About Us', link: '/#about' },
    { name: 'Instructors', link: '/#instructor' },
    { name: 'Blog', link: '#' },
    { name: 'Careers', link: '#' },
    { name: 'Press', link: '#' },
  ],
  support: [
    { name: 'FAQ', link: '/#faq' },
    { name: 'Contact', link: '/#contact' },
    { name: 'Community', link: '#' },
    { name: 'Terms', link: '#' },
    { name: 'Privacy', link: '#' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61570710927038',
    // Official Facebook Brand Color
    brandColor: '#1877F2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/zyamarufilmsacademy/',
    // Instagram uses a complex gradient, but its signature brand pink/magenta anchor is #E4405F
    brandColor: '#E4405F',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@zyamaru.films.aca?_r=1&_t=ZS-97ns4YjsVBC',
    // TikTok's core corporate body brand color is black (#000000), allowing its neon accents to shine
    brandColor: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.51 4.25 1.11 1.42 2.69 2.38 4.41 2.73v3.91c-1.54-.03-3.05-.52-4.33-1.4-.41-.29-.79-.62-1.14-.98v6.75c.04 2.11-.6 4.24-1.84 5.92-1.57 2.17-4.14 3.59-6.84 3.75-2.67.17-5.41-.75-7.29-2.65C-.27 17.27-1.01 13.9.23 10.96c.92-2.22 2.83-3.99 5.12-4.72v4.06c-1.28.43-2.39 1.42-2.89 2.69-.64 1.58-.29 3.48.88 4.69 1.07 1.14 2.68 1.66 4.22 1.34 1.76-.34 3.19-1.8 3.48-3.57.06-.36.08-.73.08-1.09V0h1.4z" />
      </svg>
    ),
  },
];
export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,8vh,5rem) var(--section-padding-x)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
        {/* Brand Column */}
        <ScrollReveal>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-amber)', textTransform: 'uppercase', marginBottom: '1rem' }}>ZYAMARU</div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 280 }}>
              Nepal&apos;s premier cinematography and videography academy. Transforming storytellers since 2014.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map(({ name, url, icon, brandColor }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    borderColor: brandColor,
                    backgroundColor: brandColor,
                    color: '#ffffff',
                  }}
                  // Dynamic inline hover states using the object properties:
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FDE295';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = brandColor;

                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([title, items], i) => (
          <ScrollReveal key={title} delay={0.1 * (i + 1)}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {items.map((item) => (
                  <li key={item.name}>
                    <a href={item.link} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-primary)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-muted)'; }}
                    >{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}

        {/* Newsletter Column */}
        <ScrollReveal delay={0.4}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.6 }}>Get filmmaking tips, course updates, and exclusive offers.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: '0.6rem 1rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', outline: 'none', transition: 'border-color 0.3s ease', minWidth: 0 }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-amber)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }} />
              <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                <span>→</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Map Column */}
        {/* Standard HTML wrapper so the grid layout can actually see it */}
        <div style={{ gridColumn: 'span 3' }}>
          <ScrollReveal delay={0.5}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>Find Us</h4>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: 'var(--radius-md, 12px)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-card)',
                  maxHeight: '300px'
                }}
              >
                <LocationMap />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--color-border)', padding: '1.5rem var(--section-padding-x)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>
          © 2026 ZYAMARU. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Made with ❤️ in Nepal 🇳🇵
        </p>
      </div>
    </footer>
  );
}