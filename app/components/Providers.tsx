'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-amber)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-amber)',
              secondary: '#0a0a0a',
            },
          },
        }}
      />
      {children}
    </QueryClientProvider>
  );
}
