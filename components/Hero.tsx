'use client';

import React from 'react';
import TerminalHUD from './TerminalHUD';
import CountdownTimer from './CountdownTimer';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden scanlines pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background glow and decorative SVG/Grid */}
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left Column: Heading and Details */}
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] font-bold tracking-[0.2em] text-primary uppercase hud-cut-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              UBIT | UNIVERSITY OF KARACHI PRESENTS
            </div>

            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight uppercase sm:text-7xl xl:text-8xl leading-[0.92]">
              <span className="text-primary red-glow">Code</span>
              <span className="text-primary">//</span>
              <span className="text-foreground">Connect</span>
              <span className="text-primary">’26</span>
            </h1>

            {/* Poster Theme Tagline */}
            <div className="mt-5 border-l-2 border-primary pl-4">
              <p className="font-mono text-base font-bold text-accent sm:text-xl tracking-wide">
                &ldquo;You Hungry? — A Karachi Startup Story&rdquo;
              </p>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mt-1">
                A 3-Round Database Design &amp; Architecture Challenge
              </p>
            </div>

            {/* Tags from Poster */}
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs font-semibold">
              {['TECH', 'DATA SCIENCE', 'DATABASE DESIGN', 'STARTUP', 'BUSINESS'].map((tag) => (
                <span
                  key={tag}
                  className="border border-primary/30 bg-[#160b0b] px-2.5 py-1 text-[11px] text-foreground/90 tracking-wider hud-cut-sm hover:border-primary transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Narrative summary */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Follow the journey of a Karachi food delivery startup: from garage spreadsheets with 10 customers,
              to multi-city riders and payments, up to 1,000,000 users facing intense Sehri &amp; Eid rushes.
              Model the schemas, optimize transactions, and defend your sharded platform architecture live!
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#rounds"
                className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-white transition-all hover:glow-primary hud-cut-sm shadow-lg shadow-primary/20"
              >
                <span>ENTER THE 3 ROUNDS</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#module"
                className="inline-flex items-center justify-center border border-primary/50 px-6 py-3.5 font-mono text-xs tracking-[0.18em] text-foreground transition-all hover:border-primary hover:bg-primary/10 hud-cut-sm"
              >
                EXPLORE MODULE
              </a>

              <a
                href="https://docs.google.com/forms/d/1IfT-lgoDO5-VoD6QSxVdvrpDqiMgsEncvDtGmwmvh2U/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-primary/30 bg-[#150a0a] px-5 py-3.5 font-mono text-xs tracking-[0.16em] text-accent hover:text-white hover:border-primary transition-all hud-cut-sm"
              >
                REGISTER VIA GOOGLE FORM
              </a>
            </div>

            {/* Quick Venue Badge */}
            <div className="mt-8 flex items-center gap-6 border-t border-primary/20 pt-4 font-mono text-xs text-muted-foreground">
              <div>
                <span className="text-primary font-bold">DAYS 1–2:</span> Online on Portal
              </div>
              <div className="h-3 w-px bg-primary/30" />
              <div>
                <span className="text-primary font-bold">DAY 3 FINAL:</span> On-Campus @ UBIT, UoK
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Terminal HUD */}
          <div className="w-full">
            <TerminalHUD />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mt-14">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
