'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnroll } from '../context/EnrollContext';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { courses } from '../data/courses';
import { useLenis } from './SmoothScroll';

// ── Validation rules ──────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,15}$/;

type FormData = {
  name: string;
  dob: string;
  gender: string;
  email: string;
  phoneNumber: string;
  permanentAddress: string;
  temporaryAddress: string;
  educationLevel: string;
  selectedCourse: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!data.name.trim())                       errs.name = 'Full name is required.';
  if (!data.dob)                               errs.dob = 'Date of birth is required.';
  if (!data.gender)                            errs.gender = 'Please select your gender.';
  if (!data.email.trim())                      errs.email = 'Email address is required.';
  else if (!EMAIL_RE.test(data.email))         errs.email = 'Enter a valid email address.';
  if (!data.phoneNumber.trim())                errs.phoneNumber = 'Phone number is required.';
  else if (!PHONE_RE.test(data.phoneNumber))   errs.phoneNumber = 'Enter a valid phone number.';
  if (!data.permanentAddress.trim())           errs.permanentAddress = 'Permanent address is required.';
  if (!data.temporaryAddress.trim())           errs.temporaryAddress = 'Temporary address is required.';
  if (!data.educationLevel)                    errs.educationLevel = 'Please select your education level.';
  if (!data.selectedCourse)                    errs.selectedCourse = 'Please select a course.';
  return errs;
}

// ── Shared input style helpers ────────────────────────────────────
const baseInputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-bg-elevated)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: '0.85rem 1rem',
  color: 'var(--color-text-primary)',
  outline: 'none',
  fontSize: '1rem',           // ← 16px prevents iOS auto-zoom
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
};

const errorInputStyle: React.CSSProperties = {
  ...baseInputStyle,
  borderColor: '#e05252',
  boxShadow: '0 0 0 2px rgba(224, 82, 82, 0.15)',
};

const selectExtraStyle: React.CSSProperties = {
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a853'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  backgroundSize: '1.2rem',
  paddingRight: '3rem',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--color-text-muted)',
  marginBottom: '0.4rem',
  display: 'block',
};

const errorMsgStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#e05252',
  marginTop: '0.3rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
};

// ── Field wrapper ─────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <span style={errorMsgStyle}>
          <span>⚠</span> {error}
        </span>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function EnrollModal() {
  const { isOpen, selectedCourse, closeEnrollModal } = useEnroll();
  const lenis = useLenis();

  const emptyForm: FormData = {
    name: '', dob: '', gender: '', email: '', phoneNumber: '',
    permanentAddress: '', temporaryAddress: '', educationLevel: '',
    selectedCourse: selectedCourse as string || '',
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, selectedCourse: selectedCourse as string || '' }));
      setErrors({});
      setTouched(false);
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

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...formData, [field]: e.target.value };
    setFormData(next);
    // Live-clear error once field becomes valid
    if (touched && errors[field]) {
      const newErrs = validate(next);
      setErrors(prev => ({ ...prev, [field]: newErrs[field] }));
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
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
        setFormData(emptyForm);
        setErrors({});
        setTouched(false);
      }, 1500);
    },
    onError: () => {
      toast.error('Failed to send application. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Scroll modal to top so user sees errors
      const modal = document.getElementById('enroll-modal-body');
      modal?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    mutation.mutate(formData);
  };

  const hasErrors = touched && Object.keys(errors).length > 0;

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
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998,
            }}
          />

          {/* Centering wrapper */}
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', inset: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              zIndex: 9999,
              padding: 'clamp(0.75rem, 3vw, 1.5rem)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              paddingTop: 'clamp(1rem, 5vw, 3rem)',
            }}
          >
            {/* Modal */}
            <motion.div
              id="enroll-modal-body"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-amber)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.25rem, 5vw, 2.5rem)',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(212,168,83,0.1)',
                marginBottom: 'clamp(1rem, 5vw, 2rem)',
              }}
            >
              {/* Close */}
              <button
                onClick={closeEnrollModal}
                aria-label="Close modal"
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'none', border: 'none',
                  color: 'var(--color-text-muted)',
                  fontSize: '1.6rem', lineHeight: 1,
                  cursor: 'pointer', padding: '0.25rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-amber)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                ×
              </button>

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
                  Join Zyamaru Films Academy
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  Fill out the form below to start your cinematic journey.
                </p>
              </div>

              {/* Global error banner */}
              {hasErrors && (
                <div style={{
                  background: 'rgba(224,82,82,0.1)',
                  border: '1px solid rgba(224,82,82,0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  color: '#e05252',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '1rem' }}>⚠</span>
                  Please fix the highlighted fields before submitting.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={set('name')}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    style={errors.name ? errorInputStyle : baseInputStyle}
                    onFocus={(e) => { if (!errors.name) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.name) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Date of Birth" error={errors.dob}>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={set('dob')}
                    style={{ ...(errors.dob ? errorInputStyle : baseInputStyle), colorScheme: 'dark' }}
                    onFocus={(e) => { if (!errors.dob) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.dob) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Gender" error={errors.gender}>
                  <select
                    value={formData.gender}
                    onChange={set('gender')}
                    style={{ ...(errors.gender ? errorInputStyle : baseInputStyle), ...selectExtraStyle }}
                    onFocus={(e) => { if (!errors.gender) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.gender) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>Select your gender</option>
                    <option value="Male" style={{ background: '#0a0a0a' }}>Male</option>
                    <option value="Female" style={{ background: '#0a0a0a' }}>Female</option>
                    <option value="Other" style={{ background: '#0a0a0a' }}>Other</option>
                  </select>
                </Field>

                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={set('email')}
                    placeholder="your@email.com"
                    autoComplete="email"
                    style={errors.email ? errorInputStyle : baseInputStyle}
                    onFocus={(e) => { if (!errors.email) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.email) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Phone / WhatsApp Number" error={errors.phoneNumber}>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={formData.phoneNumber}
                    onChange={set('phoneNumber')}
                    placeholder="+977 98XXXXXXXX"
                    autoComplete="tel"
                    style={errors.phoneNumber ? errorInputStyle : baseInputStyle}
                    onFocus={(e) => { if (!errors.phoneNumber) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.phoneNumber) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Permanent Address" error={errors.permanentAddress}>
                  <input
                    type="text"
                    value={formData.permanentAddress}
                    onChange={set('permanentAddress')}
                    placeholder="District, Province"
                    autoComplete="address-level2"
                    style={errors.permanentAddress ? errorInputStyle : baseInputStyle}
                    onFocus={(e) => { if (!errors.permanentAddress) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.permanentAddress) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Temporary Address" error={errors.temporaryAddress}>
                  <input
                    type="text"
                    value={formData.temporaryAddress}
                    onChange={set('temporaryAddress')}
                    placeholder="Current city / area"
                    style={errors.temporaryAddress ? errorInputStyle : baseInputStyle}
                    onFocus={(e) => { if (!errors.temporaryAddress) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.temporaryAddress) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  />
                </Field>

                <Field label="Education Level" error={errors.educationLevel}>
                  <select
                    value={formData.educationLevel}
                    onChange={set('educationLevel')}
                    style={{ ...(errors.educationLevel ? errorInputStyle : baseInputStyle), ...selectExtraStyle }}
                    onFocus={(e) => { if (!errors.educationLevel) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.educationLevel) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>Select your highest education</option>
                    <option value="SEE" style={{ background: '#0a0a0a' }}>SEE</option>
                    <option value="+2/Diploma" style={{ background: '#0a0a0a' }}>+2 / Diploma</option>
                    <option value="Undergraduate (Bachelor)" style={{ background: '#0a0a0a' }}>Undergraduate (Bachelor)</option>
                    <option value="Graduate (Master)" style={{ background: '#0a0a0a' }}>Graduate (Master)</option>
                    <option value="PhD" style={{ background: '#0a0a0a' }}>PhD</option>
                    <option value="Other" style={{ background: '#0a0a0a' }}>Other</option>
                  </select>
                </Field>

                <Field label="Interested Course" error={errors.selectedCourse}>
                  <select
                    value={formData.selectedCourse}
                    onChange={set('selectedCourse')}
                    style={{ ...(errors.selectedCourse ? errorInputStyle : baseInputStyle), ...selectExtraStyle }}
                    onFocus={(e) => { if (!errors.selectedCourse) { e.currentTarget.style.borderColor = 'var(--color-amber)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212,168,83,0.12)'; }}}
                    onBlur={(e) => { if (!errors.selectedCourse) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a', color: 'var(--color-text-muted)' }}>Select your program</option>
                    {courses.filter((c) => c.available).map((c) => (
                      <option key={c.id} value={c.title} style={{ background: '#0a0a0a' }}>{c.title}</option>
                    ))}
                  </select>
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary"
                  style={{ width: '100%', height: '3.25rem', marginTop: '0.5rem', fontSize: '1rem' }}
                >
                  <span>{mutation.isPending ? 'Sending…' : 'Submit Application'}</span>
                </button>

                {/* Join as Instructor — prominent divider link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: '0.25rem',
                }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
                </div>

                <a
                  href="/career"
                  onClick={() => closeEnrollModal()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-amber)',
                    background: 'rgba(212,168,83,0.06)',
                    color: 'var(--color-amber)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,168,83,0.14)';
                    e.currentTarget.style.borderColor = 'var(--color-amber)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212,168,83,0.06)';
                    e.currentTarget.style.borderColor = 'var(--color-border-amber)';
                  }}
                >
                  🎬 Join as an Instructor →
                </a>

              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}