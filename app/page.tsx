'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import ModuleIntro from '@/components/ModuleIntro';
import ScheduleSection from '@/components/ScheduleSection';
import RulesSection from '@/components/RulesSection';
import RoundsSection from '@/components/RoundsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Top Fixed Header with role toggle (web flow removed) */}
      <Navbar />

      {/* Hero with Cyber Countdown and Terminal HUD (web flow removed) */}
      <Hero />

      {/* Ticker marquee */}
      <MarqueeTicker />

      {/* Section 1: Introduction of the Module + Benefits & Industry Value */}
      <ModuleIntro />

      {/* Section 2: Schedule (Venue clearly marked as Online on the portal) */}
      <ScheduleSection />

      {/* Section 3: Rules & Participant Requirements (Deadline centered, WhatsApp removed) */}
      <RulesSection />

      {/* Section 4: Rounds Description with Round-specific forms & Single Submission lock */}
      <RoundsSection />

      {/* Section 5: FAQs with newly added questions */}
      <FaqSection />

      {/* Section 6: Socials & Official Google Form QR Code */}
      <Footer />
    </main>
  );
}
