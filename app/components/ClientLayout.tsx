'use client';

import Navbar from './Navbar';
import FilmGrain from './FilmGrain';
import CustomCursor from './CustomCursor';
import { EnrollProvider } from '../context/EnrollContext';
import EnrollModal from './EnrollModal';
import Providers from './Providers';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <EnrollProvider>
        <FilmGrain />
        <CustomCursor />
        <Navbar />
        <EnrollModal />
        {children}
      </EnrollProvider>
    </Providers>
  );
}
