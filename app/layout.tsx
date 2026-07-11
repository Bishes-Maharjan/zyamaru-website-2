import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import OrganizationSchema from "./components/OrganizationSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: "ZYAMARU | Premier Cinematography & Videography Academy in Nepal",
  description:
    "Master cinematography, videography, and visual storytelling in Nepal. Professional courses taught by award-winning filmmakers. Join 20+ filmmakers who transformed their careers.",
  keywords: [
    "cinematography course Nepal",
    "videography training Kathmandu",
    "film school Nepal",
    "filmmaking course",
    "ZYAMARU",
    "visual storytelling",
    "color grading course",
    "drone cinematography Nepal",
  ],
  openGraph: {
    title: "ZYAMARU | Master the Art of Visual Storytelling",
    description:
      "Professional cinematography & videography courses taught by award-winning filmmakers in Nepal.",
    type: "website",
    locale: "en_US",
    siteName: "ZYAMARU | Premier Cinematography & Videography Academy in Nepal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zyamaru Films Academy - Cinematography & Videography in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZYAMARU | Premier Cinematography & Videography Academy in Nepal",
    description:
      "Professional cinematography & videography courses taught by award-winning filmmakers in Nepal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon-2.png",
    apple: "/favicon-2.png",
  },
  metadataBase: new URL('https://www.zyamarufilms.com.np'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ margin: 0 }}>
        <OrganizationSchema />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
