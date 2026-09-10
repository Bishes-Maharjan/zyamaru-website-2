'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollContextType {
  isOpen: boolean;
  selectedCourse: string;
  openEnrollModal: (course?: string) => void;
  closeEnrollModal: () => void;
}

const EnrollContext = createContext<EnrollContextType | undefined>(undefined);

export function EnrollProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const openEnrollModal = (course?: string) => {
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
