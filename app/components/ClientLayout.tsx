'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import FilmGrain from './FilmGrain';
import CustomCursor from './CustomCursor';
import { EnrollProvider } from '../context/EnrollContext';
import EnrollModal from './EnrollModal';
import Providers from './Providers';
import SmoothScroll from './SmoothScroll';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStoreRoute = pathname?.startsWith('/store');

  return (
    <Providers>
      <SmoothScroll>
        <EnrollProvider>
          <FilmGrain />
          <CustomCursor />
          {!isStoreRoute && <Navbar />}
          <EnrollModal />
          {children}
        </EnrollProvider>
      </SmoothScroll>
    </Providers>
  );
}
