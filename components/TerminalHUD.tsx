'use client';

import React, { useState, useEffect } from 'react';

const CODE_SNIPPETS = [
  {
    filename: 'schema_r1_garage.sql',
    lines: [
      { num: 1, text: '-- Round 1: Karachi Food Delivery Genesis' },
      { num: 2, text: 'CREATE TABLE orders (' },
      { num: 3, text: '  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),' },
      { num: 4, text: '  customer_id INT REFERENCES customers(id),' },
      { num: 5, text: '  restaurant_id INT REFERENCES restaurants(id),' },
      { num: 6, text: '  status VARCHAR(20) CHECK (status IN (\'PREP\', \'ON_BIKE\', \'DELIVERED\')),' },
      { num: 7, text: '  created_at TIMESTAMPTZ DEFAULT NOW()' },
      { num: 8, text: ');' },
      { num: 9, text: 'CREATE INDEX idx_orders_customer ON orders(customer_id);' },
    ],
  },
  {
    filename: 'scaling_r3_sharding.ts',
    lines: [
      { num: 1, text: '// Round 3: Ramadan Spike Load Routing (1M Users)' },
      { num: 2, text: 'export async function routeOrderShard(userId: string) {' },
      { num: 3, text: '  const shardKey = hashMurmur3(userId) % TOTAL_SHARDS;' },
      { num: 4, text: '  const cachedMenu = await redis.get(`menu:ramadan:karachi`);' },
      { num: 5, text: '  if (!cachedMenu) await warmCacheFromReplica();' },
      { num: 6, text: '  return executeAcidTx(shardPool[shardKey], {' },
      { num: 7, text: '    isolation: "REPEATABLE_READ",' },
      { num: 8, text: '    timeoutMs: 250 // Zero choke during Iftar rush' },
      { num: 9, text: '  });' },
      { num: 10, text: '}' },
    ],
  },
];

export default function TerminalHUD() {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSnippetIdx((prev) => (prev + 1) % CODE_SNIPPETS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const snippet = CODE_SNIPPETS[activeSnippetIdx];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none border border-primary/40 bg-[#0d0707]/90 p-1 hud-cut-md shadow-[0_0_30px_rgba(239,59,59,0.18)]">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-primary/20 bg-[#160a0a] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary pulse-dot"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-primary/40"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
          <span className="ml-2 font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
            UBIT_DB_ENGINE :: LIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {snippet.filename}
          </span>
          <span className="border border-primary/30 px-1.5 py-0.2 text-[9px] font-mono text-primary bg-primary/10">
            UTF-8
          </span>
        </div>
      </div>

      {/* Code window */}
      <div className="relative p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[260px] bg-[#090505]">
        <div className="space-y-1">
          {snippet.lines.map((line) => (
            <div key={line.num} className="flex items-baseline group hover:bg-primary/5 px-1 rounded">
              <span className="w-8 select-none text-right font-mono text-muted-foreground/40 text-xs pr-4">
                {line.num}
              </span>
              <span className="text-foreground/90 font-mono tracking-wide">
                {line.text.startsWith('--') || line.text.startsWith('//') ? (
                  <span className="text-muted-foreground italic">{line.text}</span>
                ) : line.text.includes('CREATE') || line.text.includes('TABLE') || line.text.includes('PRIMARY') || line.text.includes('export') || line.text.includes('async') ? (
                  <span className="text-primary font-bold">{line.text}</span>
                ) : line.text.includes('REFERENCES') || line.text.includes('INDEX') || line.text.includes('await') ? (
                  <span className="text-accent">{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Scanline flare sweep */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Telemetry bottom bar */}
      <div className="flex items-center justify-between border-t border-primary/20 bg-[#120808] px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <span>STORAGE_ENGINE: POSTGRES + REDIS</span>
        </span>
        <span className="text-primary tracking-widest">
          SYNC: AUTO // GOOGLE_APPS_SCRIPT
        </span>
      </div>
    </div>
  );
}
