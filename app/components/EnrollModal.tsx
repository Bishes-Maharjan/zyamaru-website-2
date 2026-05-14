'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnroll } from '../context/EnrollContext';
import { Course } from '@/types/course';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function EnrollModal() {
  const { isOpen, selectedCourse, closeEnrollModal } = useEnroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    selectedCourse: selectedCourse as string || '',
  });

  // Sync state if selectedCourse changes from context
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, selectedCourse: selectedCourse }));
    }
  }, [isOpen, selectedCourse]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Application sent successfully!');
      setTimeout(() => {
        closeEnrollModal();
        setFormData({ name: '', email: '', phoneNumber: '', selectedCourse: '' });
      }, 1500);
    },
    onError: () => {
      toast.error('Failed to send application. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnrollModal}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998,
            }}
          />

          {/* Modal Container (Centering Wrapper) */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1.5rem',
              overflowY: 'auto',
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                width: '100%',
                maxWidth: '500px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-amber)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(212, 168, 83, 0.1)',
                margin: 'auto', // Ensures centering if content is taller than screen
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeEnrollModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-amber)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                ×
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
                  Join Zyamaru Academy
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Fill out the form below to start your cinematic journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 168, 83, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 168, 83, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+977-98XXXXXXXX"
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 168, 83, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Interested Course</label>
                  <select
                    required
                    value={formData.selectedCourse}
                    onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value as Course })}
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.3s ease',
                      appearance: 'none', // Reset default browser style
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a853'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.2rem',
                      paddingRight: '3rem',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 168, 83, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>
                      Select your program
                    </option>
                    {Object.values(Course).map((course) => (
                      <option key={course} value={course} style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary"
                  style={{ marginTop: '1rem', width: '100%', height: '3.5rem' }}
                >
                  <span>{mutation.isPending ? 'Sending...' : 'Submit Application'}</span>
                </button>

              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
