'use client';

import React from 'react';
import { useEnroll } from '../context/EnrollContext';
import { Course } from '@/types/course';

interface EnrollButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  course?: Course;
  className?: string;
  style?: React.CSSProperties;
}

export default function EnrollButton({
  children,
  variant = 'primary',
  course,
  className = '',
  style = {},
}: EnrollButtonProps) {
  const { openEnrollModal } = useEnroll();

  const buttonClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      onClick={() => openEnrollModal(course)}
      className={`${buttonClass} ${className}`}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
}
