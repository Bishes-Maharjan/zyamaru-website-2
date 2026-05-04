'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ShutterAnimation({ onComplete }: { onComplete: () => void }) {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Only animate on first visit per session
    const hasPlayed = sessionStorage.getItem('zyamaru-shutter-played');
    if (hasPlayed) {
      onComplete();
      return;
    }
    setShouldAnimate(true);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldAnimate) return;

    // Panels START covering the screen — instant black, no flash
    gsap.set(topPanelRef.current, { yPercent: 0 });
    gsap.set(bottomPanelRef.current, { yPercent: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('zyamaru-shutter-played', 'true');
        onComplete();
      },
    });

    // Phase 1: Brief hold — cinematic anticipation
    tl.to({}, { duration: 0.35 })
      // Phase 2: Subtle "snap" bounce
      .to([topPanelRef.current, bottomPanelRef.current], {
        scaleY: 1.005,
        duration: 0.05,
        ease: 'power2.out',
      })
      .to([topPanelRef.current, bottomPanelRef.current], {
        scaleY: 1,
        duration: 0.05,
        ease: 'power2.in',
      })
      // Play mechanical snap sound
      .call(() => {
        playSnapSound();
      })
      // Phase 3: ZYAMARU text flash
      .fromTo(
        '.shutter-logo',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }
      )
      .to({}, { duration: 0.25 })
      .to('.shutter-logo', { opacity: 0, duration: 0.1 })
      // Phase 4: Panels split open to reveal content
      .to(topPanelRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
      })
      .to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.7,
          ease: 'power3.inOut',
        },
        '<'
      )
      // Phase 5: Fade out container
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
  }, [shouldAnimate, onComplete]);

  if (!shouldAnimate) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      {/* Top Panel — starts covering top half */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#0a0a0a',
          transformOrigin: 'center bottom',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)',
          }}
        />
      </div>

      {/* Bottom Panel — starts covering bottom half */}
      <div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#0a0a0a',
          transformOrigin: 'center top',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)',
          }}
        />
      </div>

      {/* Center Logo Flash */}
      <div
        className="shutter-logo"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: '#d4a853',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        ZYAMARU
      </div>
    </div>
  );
}

function playSnapSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    // Create a short mechanical snap sound
    const duration = 0.08;
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / audioCtx.sampleRate;
      // Sharp transient + quick decay
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 80) * 0.3;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.15;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start();
  } catch {
    // Audio not available — fail silently
  }
}
