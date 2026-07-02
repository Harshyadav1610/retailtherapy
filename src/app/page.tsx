import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import LandingNav from '@/components/LandingNav';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
  return (
    <ThemeProvider>
      <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
        <LandingNav />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <LandingFooter />
      </div>
    </ThemeProvider>
  );
}