import './store.css';

export const metadata = {
  title: {
    default: 'Store | ZYAMARU',
    template: '%s | ZYAMARU Store'
  },
  description: 'Shop premium cinematography gear, cameras, lenses, and filmmaking accessories at ZYAMARU Store Nepal. Authentic products with WhatsApp ordering.',
  keywords: [
    'camera store Nepal',
    'cinematography equipment Nepal',
    'filmmaking gear Kathmandu',
    'buy camera Nepal',
    'ZYAMARU store',
    'video equipment Nepal',
    'Sony camera Nepal',
    'cinema lens Nepal',
  ],
  openGraph: {
    title: 'ZYAMARU Store — Premium Filmmaking Equipment',
    description: 'Shop authentic cinematography gear, cameras, and accessories. Direct WhatsApp ordering for filmmakers in Nepal.',
    type: 'website',
    siteName: 'ZYAMARU Store',
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
