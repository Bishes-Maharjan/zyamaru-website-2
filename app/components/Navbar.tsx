'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EnrollButton from './EnrollButton';

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Instructor', href: '#instructor' },
  // { label: 'Curriculum', href: '#curriculum' },
  { label: 'Careers', href: '#career' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (mobileOpen) {
        setVisible(true);
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 50) {
        setVisible(true);
        scrollAccumulator.current = 0;
      } else {
        // Accumulate scroll delta
        scrollAccumulator.current += delta;

        // If direction changes, reset the accumulator so the next threshold starts counting from 0
        if (delta > 0 && scrollAccumulator.current < 0) {
          scrollAccumulator.current = 0;
        } else if (delta < 0 && scrollAccumulator.current > 0) {
          scrollAccumulator.current = 0;
        }

        // Must scroll down by more than 15px to hide
        if (scrollAccumulator.current > 15 && visible) {
          setVisible(false);
          scrollAccumulator.current = 0;
        }
        // Must scroll up by more than 50px to show
        else if (scrollAccumulator.current < -50 && !visible) {
          setVisible(true);
          scrollAccumulator.current = 0;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen, visible]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (pathname !== '/') {
      router.push('/' + href);
      return;
    }

    if (href.includes('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top trigger zone to detect mouse hover at the top when navbar is hidden */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          zIndex: 999,
          pointerEvents: (visible || isHovered) ? 'none' : 'auto',

        }}
      />

      <motion.nav
        initial={{ y: -150 }}
        animate={{ y: (visible || isHovered) ? 0 : -150 }}
        transition={{ duration: 0.2, delay: hasEntered ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem var(--section-padding-x)' : '1.25rem var(--section-padding-x)',
          background: mobileOpen ? 'transparent' : (scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent'),
          backdropFilter: mobileOpen ? 'none' : (scrolled ? 'blur(20px)' : 'none'),
          WebkitBackdropFilter: mobileOpen ? 'none' : (scrolled ? 'blur(20px)' : 'none'),
          borderBottom: mobileOpen ? '1px solid transparent' : (scrolled ? '1px solid var(--color-border)' : '1px solid transparent'),
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div className="nav-logo" style={{ position: 'relative', width: '100px', height: '100px' }}>
            <Image
              src="/logo.png"
              alt="ZYAMARU Logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--color-amber)',
            textTransform: 'uppercase',
          }}>
            ZYAMARU
          </span> */}

        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-text-secondary)';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <EnrollButton
          variant="primary"
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
          className="nav-cta"
        >
          Enroll Now
        </EnrollButton>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text-primary)' }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text-primary)' }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text-primary)' }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(10, 10, 10, 0.97)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <EnrollButton
              variant="primary"
              style={{ marginTop: '1rem' }}
            >
              Enroll Now
            </EnrollButton>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-cta {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
          .nav-logo {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </>
  );
}
