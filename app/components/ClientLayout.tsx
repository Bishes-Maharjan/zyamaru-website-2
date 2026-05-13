'use client';

import Navbar from './Navbar';
import FilmGrain from './FilmGrain';
import CustomCursor from './CustomCursor';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilmGrain />
      <CustomCursor />
      <Navbar />
      {children}
    </>
  );
}
