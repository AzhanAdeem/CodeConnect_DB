'use client';

import React from 'react';

const TICKER_ITEMS = [
  'BUILD',
  'CODE',
  'NORMALIZE',
  'INDEX',
  'SHARD',
  'SCALE',
  '"YOU HUNGRY?"',
  'CODE//CONNECT\'26',
  'UBIT UOK',
  'DATABASE DESIGN',
];

export default function MarqueeTicker() {
  return (
    <div className="relative border-y border-primary/30 bg-primary/[0.07] py-3.5 overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 font-display text-lg font-bold tracking-[0.2em] uppercase select-none">
        {/* Repeating twice for continuous loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
            <span className={item.includes('CODE//CONNECT') || item.includes('"YOU') ? 'text-primary red-glow' : 'text-foreground/80'}>
              {item}
            </span>
            <span className="text-primary font-mono">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
