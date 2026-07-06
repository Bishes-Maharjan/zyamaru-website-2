'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnroll } from '../context/EnrollContext';
import { Course } from '@/types/course';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { courses } from '../data/courses';
import { useLenis } from './SmoothScroll';

export default function EnrollModal() {
  const { isOpen, selectedCourse, closeEnrollModal } = useEnroll();
  const lenis = useLenis();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phoneNumber: '',
    permanentAddress: '',
    temporaryAddress: '',
    educationLevel: '',
    selectedCourse: selectedCourse as string || '',
  });

  // Sync state if selectedCourse changes from context
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, selectedCourse: selectedCourse }));
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, selectedCourse, lenis]);

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
        setFormData({ name: '', dob: '', gender: '', email: '', phoneNumber: '', permanentAddress: '', temporaryAddress: '', educationLevel: '', selectedCourse: '' });
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
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1.5rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
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
                maxHeight: 'calc(100vh - 3rem)',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-amber)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(212, 168, 83, 0.1)',
                margin: 'auto',
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
                  Join Zyamaru Films Academy
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
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Date of Birth</label>
                  <input
                    required
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
                      colorScheme: 'dark',
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
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Gender</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
                      appearance: 'none',
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
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>Select your gender</option>
                    <option value="Male" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Male</option>
                    <option value="Female" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Female</option>
                    <option value="Other" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Other</option>
                  </select>
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
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Permanent Address</label>
                  <input
                    required
                    type="text"
                    value={formData.permanentAddress}
                    onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                    placeholder="Enter your permanent address"
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
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Temporary Address</label>
                  <input
                    required
                    type="text"
                    value={formData.temporaryAddress}
                    onChange={(e) => setFormData({ ...formData, temporaryAddress: e.target.value })}
                    placeholder="Enter your temporary address"
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
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Education Level</label>
                  <select
                    required
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
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
                      appearance: 'none',
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
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>Select your highest education</option>
                    <option value="SEE" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>SEE</option>
                    <option value="+2/Diploma" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>+2 / Diploma</option>
                    <option value="Undergraduate (Bachelor)" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Undergraduate (Bachelor)</option>
                    <option value="Graduate (Master)" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Graduate (Master)</option>
                    <option value="PhD" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>PhD</option>
                    <option value="Other" style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>Other</option>
                  </select>
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
                    {courses.filter((course) => course.available).map((course) => (
                      <option key={course.id} value={course.title} style={{ background: '#0a0a0a', color: 'var(--color-text-primary)' }}>
                        {course.title}
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
