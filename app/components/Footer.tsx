'use client';

import { courses } from '../data/courses';
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

const socialLinks = {
  FB: 'https://www.facebook.com/profile.php?id=61570710927038',
  IG: 'https://www.instagram.com/zyamarufilmsacademy/',
};

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,8vh,5rem) var(--section-padding-x)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        {/* Brand Column */}
        <ScrollReveal>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-amber)', textTransform: 'uppercase', marginBottom: '1rem' }}>ZYAMARU</div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 280 }}>
              Nepal&apos;s premier cinematography and videography academy. Transforming storytellers since 2014.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {Object.entries(socialLinks).map(([s, url]) => (
                <a key={s} href={url} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted)', transition: 'all 0.3s ease', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => { (e.currentTarget).style.borderColor = 'var(--color-amber)'; (e.currentTarget).style.color = 'var(--color-amber)'; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.borderColor = 'var(--color-border)'; (e.currentTarget).style.color = 'var(--color-text-muted)'; }}
                >{s}</a>
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
