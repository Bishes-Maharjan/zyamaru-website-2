import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

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

export const metadata: Metadata = {
  title: "ZYAMARU | Premier Cinematography & Videography Academy in Nepal",
  description:
    "Master cinematography, videography, and visual storytelling in Nepal. Professional courses taught by award-winning filmmakers. Join 500+ filmmakers who transformed their careers.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "ZYAMARU | Premier Cinematography & Videography Academy in Nepal",
    description:
      "Professional cinematography & videography courses taught by award-winning filmmakers in Nepal.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
