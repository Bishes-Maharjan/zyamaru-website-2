'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/types/course';

interface EnrollContextType {
  isOpen: boolean;
  selectedCourse: Course | '';
  openEnrollModal: (course?: Course) => void;
  closeEnrollModal: () => void;
}

const EnrollContext = createContext<EnrollContextType | undefined>(undefined);

export function EnrollProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('');

  const openEnrollModal = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
    }
    setIsOpen(true);
  };

  const closeEnrollModal = () => {
    setIsOpen(false);
    // Optionally keep the selection or reset it
  };

  return (
    <EnrollContext.Provider value={{ isOpen, selectedCourse, openEnrollModal, closeEnrollModal }}>
      {children}
    </EnrollContext.Provider>
  );
}

export function useEnroll() {
  const context = useContext(EnrollContext);
  if (context === undefined) {
    throw new Error('useEnroll must be used within an EnrollProvider');
  }
  return context;
}
