'use client';

import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 0,
    minutes: 48,
    seconds: 20,
  });

  useEffect(() => {
    // Target: 22 October 2026, 09:00:00 PKT
    const target = new Date('2026-10-22T09:00:00+05:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format2Digits = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      className="relative mx-auto w-full max-w-3xl border border-primary/40 bg-card/40 px-3 pt-8 pb-4 backdrop-blur-md sm:px-6 sm:pt-9 sm:pb-5 hud-cut-sm shadow-[0_0_25px_rgba(239,59,59,0.15)]"
      role="timer"
      aria-label="Countdown to CodeConnect 2026"
    >
      {/* Corner Brackets */}
      <span className="pointer-events-none absolute top-0 left-0 border-t-2 border-l-2 border-primary h-3.5 w-3.5" />
      <span className="pointer-events-none absolute top-0 right-0 border-t-2 border-r-2 border-primary h-3.5 w-3.5" />
      <span className="pointer-events-none absolute bottom-0 left-0 border-b-2 border-l-2 border-primary h-3.5 w-3.5" />
      <span className="pointer-events-none absolute right-0 bottom-0 border-r-2 border-b-2 border-primary h-3.5 w-3.5" />

      {/* Top telemetry tags */}
      <div className="pointer-events-none absolute inset-x-3 top-2.5 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-primary/80 uppercase sm:inset-x-6">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot"></span>
          COUNTDOWN_TIMER_INIT
        </span>
        <span>UBIT_KARACHI_MAIN</span>
      </div>

      <p className="mb-4 text-center font-mono text-[11px] tracking-[0.25em] text-primary uppercase">
        — CODE//CONNECT&#39;26 · THE ULTIMATE DATABASE CHALLENGE —
      </p>

      {/* 4 Block Countdown */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: 'DAYS', value: format2Digits(timeLeft.days) },
          { label: 'HOURS', value: format2Digits(timeLeft.hours) },
          { label: 'MINUTES', value: format2Digits(timeLeft.minutes) },
          { label: 'SECONDS', value: format2Digits(timeLeft.seconds) },
        ].map((item) => (
          <div
            key={item.label}
            className="relative flex min-h-[5.5rem] flex-col items-center justify-center border border-primary/35 bg-background/60 px-2 py-3 backdrop-blur-sm sm:min-h-[6.5rem] sm:px-3 hud-cut-sm hover:border-primary transition-colors"
          >
            <span className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l border-primary" />
            <span className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-primary" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r border-b border-primary" />

            <span className="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums sm:text-4xl lg:text-5xl">
              {item.value}
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.22em] text-primary uppercase sm:text-xs font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase px-1">
        <span>KICKOFF // 22 OCT 2026</span>
        <span className="text-primary font-bold">DEADLINE: 18 OCT 2026</span>
      </div>
    </div>
  );
}
