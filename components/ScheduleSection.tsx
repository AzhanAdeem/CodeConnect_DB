'use client';

import React, { useState } from 'react';
import { SCHEDULE_DAYS } from '@/lib/data';
import { Calendar, Clock, Globe, ChevronRight, Laptop, Sparkles } from 'lucide-react';

export default function ScheduleSection() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const currentDay = SCHEDULE_DAYS[activeDayIdx] || SCHEDULE_DAYS[0];

  return (
    <section id="schedule" className="relative py-24 bg-background border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              TIMELINE &amp; WORKING WINDOWS
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
              Online Hackathon Schedule
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl">
              Two days online with 3 hours of working time per round. Participants submit their work online on the portal.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/30 px-3.5 py-2 hud-cut-sm">
            <Calendar className="w-4 h-4" />
            <span>17 — 18 OCTOBER 2026 (ONLINE)</span>
          </div>
        </div>

        {/* Day Selector Tabs (2 Days Online) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCHEDULE_DAYS.map((day, idx) => {
            const isSelected = activeDayIdx === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIdx(idx)}
                className={`relative p-5 text-left transition-all border hud-cut-md ${
                  isSelected
                    ? 'border-primary bg-[#190c0c] glow-border shadow-[0_0_20px_rgba(239,59,59,0.25)]'
                    : 'border-primary/25 bg-card/40 hover:border-primary/60 hover:bg-[#120808]'
                }`}
              >
                <span className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-primary" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    DAY 0{day.dayNumber}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-cyan-500/40 text-cyan-400 bg-cyan-950/30">
                    {day.mode.toUpperCase()} · 3 HOURS
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground uppercase">
                  {day.roundAssociated.split(':')[1] || day.roundAssociated}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{day.date} (9:00 AM – 12:00 PM)</p>
              </button>
            );
          })}
        </div>

        {/* Selected Day Agenda Box */}
        <div className="mt-8 border border-primary/35 bg-[#120707] p-6 sm:p-8 hud-cut-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-primary/20 gap-4">
            <div>
              <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                {currentDay.roundAssociated}
              </div>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
                {currentDay.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="flex items-center gap-1.5 border border-primary/30 bg-background/60 px-3 py-1.5 text-foreground/90">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>VENUE: {currentDay.venue}</span>
              </span>
              <span className="border border-primary/30 bg-background/60 px-3 py-1.5 text-primary">
                TOTAL WORKING TIME: 3 HOURS
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Hour by hour Timeline */}
            <div>
              <h4 className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                ROUND AGENDA &amp; SCHEDULE
              </h4>
              <div className="space-y-4">
                {currentDay.agenda.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 border border-primary/20 bg-background/40 hover:border-primary/50 transition-colors"
                  >
                    <span className="font-mono text-xs text-primary font-bold whitespace-nowrap min-w-[140px] pt-0.5">
                      {slot.time}
                    </span>
                    <span className="text-sm text-foreground/90 font-medium">
                      {slot.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Highlights & Submission Notes */}
            <div className="border border-primary/20 bg-background/50 p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs font-bold tracking-widest text-accent uppercase mb-4">
                  OPERATIONAL SPECIFICATIONS
                </h4>
                <ul className="space-y-3 font-mono text-xs text-muted-foreground">
                  {currentDay.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-primary/20">
                <div className="font-mono text-[11px] text-primary flex items-center gap-2">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>
                    Submit SQL &amp; ERD drive links directly on the portal before the 12:00 PM cutoff.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note on Day 3 presentation */}
        <div className="mt-6 border border-primary/20 bg-[#120808]/70 p-4 font-mono text-xs text-muted-foreground flex items-center justify-between hud-cut-sm">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              Final Round 3: Pitch &amp; Presentation will take place on <strong>22nd Oct, Thursday (9:00 AM – 11:00 AM)</strong>.
              Detailed on-campus schedule will be published following Round 1 &amp; 2 evaluations.
            </span>
          </span>
          <span className="border border-primary/30 px-2 py-0.5 text-primary text-[10px]">
            DAY 3 COMING SOON
          </span>
        </div>
      </div>
    </section>
  );
}
