import React from 'react';
import Link from 'next/link';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Dedicated Navbar for /learn */}
      <header style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/learn" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <span style={{
            color: 'var(--color-amber)',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>ZYAMARU</span>
          <span style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}>| Interactive Course</span>
        </Link>
        <Link href="/" className="btn-secondary" style={{
          fontSize: '0.75rem',
          padding: '0.5rem 1.25rem',
        }}>
          ← Back to Website
        </Link>
      </header>

      {/* Main Content Area — centered */}
      <main style={{
        flex: 1,
        width: '100%',
        backgroundColor: 'var(--color-bg)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(2rem, 5vh, 4rem) clamp(1.5rem, 5vw, 5rem)',
        }}>
          {children}
        </div>
      </main>
    </div>
  );
}
