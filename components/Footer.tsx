'use client';

import React from 'react';
import { MapPin, Globe, Github, Linkedin, Instagram, ArrowUp, ExternalLink, QrCode } from 'lucide-react';
import Image from 'next/image';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/1IfT-lgoDO5-VoD6QSxVdvrpDqiMgsEncvDtGmwmvh2U/edit';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="socials" className="relative border-t border-primary/30 bg-[#080404] pt-16 pb-12 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Column 1: Brand & Organizer */}
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 120 64" className="w-auto h-7" aria-hidden="true">
                <defs>
                  <linearGradient id="cc-red-footer" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff5a4e" />
                    <stop offset="100%" stopColor="#c81e1e" />
                  </linearGradient>
                </defs>
                <path d="M47 6H27a26 26 0 0 0 0 52h20l-6-10H27a16 16 0 0 1 0-32h14z" fill="#f5f2f2" />
                <path d="M14 32h10" stroke="#f5f2f2" strokeWidth="2.6" />
                <circle cx="28" cy="32" r="5" fill="#f5f2f2" />
                <path d="M51 46h7l10-28h-7z M60 46h7l10-28h-7z" fill="url(#cc-red-footer)" />
                <path d="M73 6h20a26 26 0 0 1 0 52H73l6-10h14a16 16 0 0 0 0-32H79z" fill="url(#cc-red-footer)" />
                <path d="M96 32h10" stroke="#ef3b3b" strokeWidth="2.6" />
                <circle cx="92" cy="32" r="5" fill="#ef3b3b" />
              </svg>
              <span className="font-display font-bold tracking-tight uppercase text-xl">
                <span className="text-primary">Code</span>
                <span className="text-primary">//</span>
                <span className="text-foreground">Connect</span>
                <span className="text-primary">’26</span>
              </span>
            </div>

            <p className="mt-4 font-mono text-xs text-accent font-semibold tracking-wide">
              &ldquo;You Hungry? — A Karachi Startup Story&rdquo;
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Organized by Department of Computer Science (UBIT), University of Karachi.
              Empowering the next generation of system architects and database engineers.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/80">
              <div className="flex items-center gap-2 border border-primary/20 bg-background/60 px-3 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>UBIT, University of Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Column 2: Official Links & Social Channels */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4">
              COMMUNICATIONS &amp; SOCIALS
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground/90 hover:text-primary transition-colors p-2.5 border border-primary/30 bg-card/40 hud-cut-sm group"
              >
                <span className="flex items-center gap-2 font-bold text-accent">
                  <QrCode className="w-4 h-4 text-primary" />
                  <span>Official Registration Form</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="https://codeconnect26.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground/90 hover:text-primary transition-colors p-2.5 border border-primary/20 bg-card/40 hud-cut-sm"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Official Hub: codeconnect26.vercel.app</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </a>

              <div className="flex items-center gap-3 pt-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all hud-cut-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all hud-cut-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all hud-cut-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Exact Scannable Google Form QR Code */}
          <div className="border border-primary/40 bg-card/60 p-5 hud-cut-md flex flex-col items-center text-center shadow-[0_0_25px_rgba(239,59,59,0.15)]">
            <div className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase mb-2">
              SCAN TO REGISTER
            </div>

            {/* Generated High-Resolution Google Form QR Code */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3 bg-white border-2 border-primary rounded-sm shadow-[0_0_20px_rgba(239,59,59,0.25)] hover:scale-105 transition-transform"
              title="Click or scan to open Google Registration Form"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/google_form_qr.svg"
                alt="CodeConnect 2026 Google Form QR Code"
                className="w-32 h-32 block"
              />
            </a>

            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Deadline: 18 Oct 2026 · Teams of up to 4
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-primary text-xs font-mono font-bold hover:underline"
            >
              <span>Open Google Registration Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Back to top */}
        <div className="mt-14 pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div>
            &copy; 2026 Code//Connect · Department of Computer Science (UBIT), University of Karachi. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
          >
            <span>SCROLL_TO_TOP</span>
            <ArrowUp className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
}
