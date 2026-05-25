'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqCategories } from '../data/faqs';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState<'general' | 'courses' | 'cinematography' | 'specialized' | 'documentary' | 'career'>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeCategory = faqCategories.find((cat) => cat.id === activeTab) || faqCategories[0];

  const handleTabChange = (tabId: 'general' | 'courses' | 'cinematography' | 'specialized' | 'documentary' | 'career') => {
    setActiveTab(tabId);
    setOpenIndex(null); // Close accordion items when switching tabs
  };

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ color: 'var(--color-amber)', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const formatAnswer = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: '0.5rem' }} />;

      if (trimmed.startsWith('•')) {
        const content = trimmed.substring(1).trim();
        return (
          <li
            key={idx}
            style={{
              marginLeft: '1.25rem',
              marginBottom: '0.5rem',
              listStyleType: 'disc',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
            {parseBold(content)}
          </li>
        );
      }

      return (
        <p
          key={idx}
          style={{
            marginBottom: '0.8rem',
            fontSize: '0.92rem',
            lineHeight: 1.65,
            color: 'var(--color-text-secondary)',
          }}
        >
          {parseBold(line)}
        </p>
      );
    });
  };

  return (
    <section
      id="faq"
      className="section"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <ScrollReveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              FAQ
            </div>
          </ScrollReveal>
          <TextReveal text="Frequently Asked Questions" as="h2" />
        </div>

        {/* Custom Tabs */}
        <ScrollReveal delay={0.1}>
          <div
            className="faq-tabs-container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.65rem',
              marginBottom: '2.5rem',
            }}
          >
            {faqCategories.map((category) => {
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleTabChange(category.id)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    background: isActive ? 'transparent' : 'rgba(20, 20, 20, 0.4)',
                    border: isActive ? '1px solid transparent' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    color: isActive ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                  className={`faq-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span style={{ position: 'relative', zIndex: 3 }}>
                    {category.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeFaqTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--color-amber), var(--color-amber-dark))',
                        borderRadius: 'var(--radius-full)',
                        zIndex: 1,
                        boxShadow: '0 4px 15px rgba(212, 168, 83, 0.15)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              {activeCategory.items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      background: 'var(--color-bg-card)',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isOpen ? 'var(--color-border-amber)' : 'var(--color-border)'}`,
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease, background-color 0.3s ease',
                    }}
                    className="faq-card"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem 1.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '1rem',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: isOpen ? 'var(--color-amber-light)' : 'var(--color-text-primary)',
                          lineHeight: 1.4,
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.question}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          color: isOpen ? 'var(--color-amber)' : 'var(--color-text-muted)',
                          fontSize: '1rem',
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        ▾
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              padding: '0 1.5rem 1.5rem 1.5rem',
                              borderTop: '1px solid rgba(255,255,255,0.02)',
                              marginTop: '0.25rem',
                            }}
                          >
                            {formatAnswer(item.answer)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .faq-card:hover {
          background-color: var(--color-bg-card-hover) !important;
          border-color: ${openIndex !== null ? 'var(--color-border-amber)' : 'var(--color-border-hover)'};
        }
        .faq-tab-btn:hover:not(.active) {
          color: var(--color-text-primary) !important;
          border-color: var(--color-border-hover) !important;
          background-color: rgba(30, 30, 30, 0.6) !important;
        }
      `}</style>
    </section>
  );
}
