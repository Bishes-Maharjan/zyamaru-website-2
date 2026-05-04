'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from './components/SmoothScroll';
import ShutterAnimation from './components/ShutterAnimation';
import FilmGrain from './components/FilmGrain';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import MarqueeText from './components/MarqueeText';
import FeaturedCourses from './components/FeaturedCourses';
import WhyChooseUs from './components/WhyChooseUs';
import InstructorSection from './components/InstructorSection';
import CurriculumPreview from './components/CurriculumPreview';
import TestimonialSection from './components/TestimonialSection';
import ShowreelSection from './components/ShowreelSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  const [shutterDone, setShutterDone] = useState(false);

  const handleShutterComplete = useCallback(() => {
    setShutterDone(true);
  }, []);

  return (
    <SmoothScroll>
      <ShutterAnimation onComplete={handleShutterComplete} />
      <FilmGrain />
      <CustomCursor />

      {/* Content renders immediately but stays invisible behind the shutter.
          When shutter opens, content is already mounted and fades in seamlessly. */}
      <main
        style={{
          opacity: shutterDone ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Navbar />
        <HeroSection />
        <StatsBar />
        <MarqueeText />
        <FeaturedCourses />
        <WhyChooseUs />
        <InstructorSection />
        <CurriculumPreview />
        <TestimonialSection />
        <ShowreelSection />
        <CTASection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

