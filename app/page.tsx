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
import JudgeLoginModal from '@/components/JudgeLoginModal';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Top Fixed Header with protected Judge Login */}
      <Navbar />

      {/* Hero with Cyber Countdown and Terminal HUD */}
      <Hero />

      {/* Ticker marquee */}
      <MarqueeTicker />

      {/* Section 1: Introduction of the Module + 2 Rounds Overview + Benefits & Industry Value */}
      <ModuleIntro />

      {/* Section 2: Updated Schedule (Day 1 & Day 2 Online on the portal; 3 Hours each) */}
      <ScheduleSection />

      {/* Section 3: Rules & Participant Requirements (Deadline centered, WhatsApp removed) */}
      <RulesSection />

      {/* Section 4: Rounds Description with 2 Rounds & Direct Organizer Delivery */}
      <RoundsSection />

      {/* Section 5: FAQs with newly added questions */}
      <FaqSection />

      {/* Section 6: Socials & Official Google Form QR Code */}
      <Footer />

      {/* Password-protected Judge Login Modal */}
      <JudgeLoginModal />
    </main>
  );
}
