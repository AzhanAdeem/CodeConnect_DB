'use client';

import React from 'react';
import { RULES_LIST } from '@/lib/data';
import { BatteryCharging, Wifi, Laptop, Users, ShieldAlert, Award, FileCode2 } from 'lucide-react';

export default function RulesSection() {
  const iconMap: Record<string, any> = {
    'Hardware Rule': Laptop,
    Connectivity: Wifi,
    Eligibility: Users,
    'Online Rounds': FileCode2,
    'Day 3 Finals': Award,
    'Fair Play': ShieldAlert,
  };

  return (
    <section id="rules" className="relative py-24 bg-[#0a0606] border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            PROTOCOL &amp; COMPLIANCE
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
            Rules &amp; Participant Requirements
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Essential guidelines issued by UBIT Computer Science Department to ensure fair play, seamless online submissions, and smooth on-campus operations.
          </p>
        </div>

        {/* Priority Participant Highlights (From the poster) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-primary/40 bg-primary/10 p-5 hud-cut-sm flex items-center gap-4">
            <div className="p-3 bg-primary text-white hud-cut-sm">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider">
                CORE MANDATE
              </div>
              <div className="font-display text-lg font-bold uppercase text-foreground">
                BYOD: Bring Your Own Device
              </div>
            </div>
          </div>

          <div className="border border-primary/40 bg-primary/10 p-5 hud-cut-sm flex items-center gap-4">
            <div className="p-3 bg-primary text-white hud-cut-sm">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider">
                POWER READINESS
              </div>
              <div className="font-display text-lg font-bold uppercase text-foreground">
                Battery Charged to 100%
              </div>
            </div>
          </div>

          <div className="border border-primary/40 bg-primary/10 p-5 hud-cut-sm flex items-center gap-4">
            <div className="p-3 bg-primary text-white hud-cut-sm">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider">
                DATA BACKUP
              </div>
              <div className="font-display text-lg font-bold uppercase text-foreground">
                Zong or Jazz 4G Package
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Grid of Rules */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RULES_LIST.map((rule, idx) => {
            const Icon = iconMap[rule.badge] || Laptop;
            return (
              <div
                key={idx}
                className="relative border border-primary/25 bg-card/50 p-6 hud-cut-md hover:border-primary transition-all group flex flex-col justify-between"
              >
                <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary" />
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-primary/15">
                    <span className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase">
                      RULE 0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground border border-primary/20 px-2 py-0.5 bg-primary/5">
                      {rule.badge}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="p-2 border border-primary/30 bg-primary/10 text-primary group-hover:glow-primary transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg font-bold uppercase text-foreground">
                      {rule.title}
                    </h3>
                  </div>

                  <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-primary/15 font-mono text-[10px] text-primary/80 flex items-center justify-between">
                  <span>DISQUALIFICATION RISK: HIGH</span>
                  <span className="text-foreground">STRICT ENFORCEMENT</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Registration Deadline (WhatsApp number removed as instructed) */}
        <div className="mt-12 border border-primary/40 bg-[#160a0a] p-5 hud-cut-sm text-center shadow-[0_0_20px_rgba(239,59,59,0.12)]">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary pulse-dot" />
            <span className="font-mono text-sm sm:text-base text-foreground font-semibold tracking-wider uppercase">
              FINAL REGISTRATION DEADLINE: <strong className="text-primary font-bold">18 OCTOBER 2026</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
