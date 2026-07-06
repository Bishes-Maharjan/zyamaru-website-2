'use client';

import { useState, useCallback } from 'react';
import ShutterAnimation from './components/ShutterAnimation';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import MarqueeText from './components/MarqueeText';
import FeaturedCourses from './components/FeaturedCourses';
import WhyChooseUs from './components/WhyChooseUs';
import InstructorSection from './components/InstructorSection';
import CurriculumPreview from './components/CurriculumPreview';
import TestimonialSection from './components/TestimonialSection';
import ShowreelSection from './components/ShowreelSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  const [shutterDone, setShutterDone] = useState(false);

  const handleShutterComplete = useCallback(() => {
    setShutterDone(true);
  }, []);

  return (
    <>
      <ShutterAnimation onComplete={handleShutterComplete} />

      {/* Content pre-renders behind the shutter at opacity:0.
          When shutter completes, it fades in instantly — no mounting delay. */}
      <main
        style={{
          opacity: shutterDone ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <HeroSection />
        <StatsBar />
        <MarqueeText />
        <FeaturedCourses />
        <WhyChooseUs />
        <InstructorSection />
        <CurriculumPreview />
        <TestimonialSection />
        <ShowreelSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
