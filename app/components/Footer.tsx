'use client';

import { socialIcons } from '../data/socialIcons';
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
    { name: 'Careers', link: '/career' },
    { name: 'Press', link: 'https://www.youtube.com/@zyamarufilmmakers5114' },
  ],
  support: [
    { name: 'FAQ', link: '/#faq' },
    { name: 'Community', link: 'https://www.tiktok.com/@zyamaru.films.aca?_r=1&_t=ZS-97ns4YjsVBC' },
    { name: 'Terms of Service', link: '/terms' },
    { name: 'Privacy Policy', link: '/privacy' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61570710927038',
    brandColor: socialIcons.Facebook.color,
    icon: socialIcons.Facebook.icon,
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@zyamarufilmmakers5114',
    brandColor: socialIcons.Youtube.color,
    icon: socialIcons.Youtube.icon,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/zyamarufilmsacademy/',
    brandColor: socialIcons.Instagram.color,
    icon: socialIcons.Instagram.icon,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@zyamaru.films.aca?_r=1&_t=ZS-97ns4YjsVBC',
    brandColor: socialIcons.Tiktok.color,
    icon: socialIcons.Tiktok.icon,
  },
  {
    name: 'Email',
    url: 'mailto:info@zyamarufilms.com.np',
    brandColor: socialIcons.Email.color,
    icon: socialIcons.Email.icon,
  },
  {
    name: 'Phone',
    url: 'tel:+9702626853',
    brandColor: socialIcons.Phone.color,
    icon: socialIcons.Phone.icon,
  },
];


export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      {/* Main Footer */}
      <div className="footer-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,8vh,5rem) var(--section-padding-x)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>

        {/* Brand Column */}
        <ScrollReveal>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-amber)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ZYAMARU
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 280 }}>
              Nepal&apos;s premier cinematography and videography academy. Transforming storytellers since 2014.
            </p>

            {/* Direct Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <a href="mailto:info@zyamarufilms.com.np" style={{ color: 'var(--color-amber)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-amber)'}>
                <span style={{ fontSize: '1rem', color: 'var(--color-amber)' }}>✉</span> info@zyamarufilms.com.np
              </a>
              <a href="tel:+9779867242664" style={{ color: 'var(--color-amber)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-amber)'}>
                <span style={{ fontSize: '1rem', color: 'var(--color-amber)' }}>📞</span> +977 9867242664
              </a>
            </div>

            {/* Social Media Only Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks
                .filter(link => !['Email', 'Phone'].includes(link.name)) // Filters out email/phone from icon strip
                .map(({ name, url, icon, brandColor }) => (
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      background: brandColor,
                      outline: '1px solid transparent',
                      outlineOffset: '2px',
                      transition: 'outline-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.outlineColor = '#D4A853'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.outlineColor = 'transparent'; }}
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
        <div className="footer-map" style={{ gridColumn: 'span 3' }}>
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

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-map {
            grid-column: auto !important;
          }
        }
      `}</style>
    </footer>
  );
}