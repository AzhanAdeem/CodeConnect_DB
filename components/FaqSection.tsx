'use client';

import React, { useState } from 'react';
import { FAQS_DATA } from '@/lib/data';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Submissions & Code', 'Judging', 'On-Campus'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQS_DATA
      : FAQS_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="faqs" className="relative py-24 bg-[#0a0606] border-t border-primary/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            INTELLIGENCE DESK
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Clear answers about evaluation criteria, code storage policies, PDF prompts, and on-campus rules.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 transition-all hud-cut-sm border ${
                activeCategory === cat
                  ? 'border-primary bg-primary text-white font-bold glow-primary'
                  : 'border-primary/30 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-primary/25 bg-card/40 backdrop-blur-sm hud-cut-sm transition-all hover:border-primary/60"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display text-lg uppercase tracking-tight text-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">
                      [0{idx + 1}]
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-primary/15 font-sans text-sm text-foreground/85 leading-relaxed">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                      <span className="text-primary font-semibold">CATEGORY:</span>
                      <span>{faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpdesk banner */}
        <div className="mt-12 text-center p-6 border border-primary/20 bg-background/50 hud-cut-sm">
          <p className="font-mono text-xs text-muted-foreground">
            Still have a query regarding team registration or submission logistics?
          </p>
          <a
            href="https://wa.me/923458126462"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-primary hover:underline font-mono text-xs font-bold tracking-wider"
          >
            <MessageSquare className="w-4 h-4" />
            <span>CONTACT UBIT HELPDESK VIA WHATSAPP (+92 345 8126462)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
