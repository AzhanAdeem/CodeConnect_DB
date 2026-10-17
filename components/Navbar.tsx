'use client';

import React, { useState } from 'react';
import { useRole } from './AuthProvider';
import { ShieldCheck, Lock, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { role, isJudgeLoggedIn, logoutJudge, setIsLoginModalOpen, currentUser } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#080505]/90 backdrop-blur-md border-b border-primary/25">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 120 64" className="w-auto h-7" aria-hidden="true">
            <defs>
              <linearGradient id="cc-red-nav" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff5a4e" />
                <stop offset="100%" stopColor="#c81e1e" />
              </linearGradient>
            </defs>
            <path d="M47 6H27a26 26 0 0 0 0 52h20l-6-10H27a16 16 0 0 1 0-32h14z" fill="#f5f2f2" />
            <path d="M14 32h10" stroke="#f5f2f2" strokeWidth="2.6" />
            <circle cx="28" cy="32" r="5" fill="#f5f2f2" />
            <path d="M51 46h7l10-28h-7z M60 46h7l10-28h-7z" fill="url(#cc-red-nav)" />
            <path d="M73 6h20a26 26 0 0 1 0 52H73l6-10h14a16 16 0 0 0 0-32H79z" fill="url(#cc-red-nav)" />
            <path d="M96 32h10" stroke="#ef3b3b" strokeWidth="2.6" />
            <circle cx="92" cy="32" r="5" fill="#ef3b3b" />
          </svg>
          <span className="font-display font-bold tracking-tight uppercase text-lg">
            <span className="text-primary">Code</span>
            <span className="text-primary">//</span>
            <span className="text-foreground">Connect</span>
            <span className="text-primary">’26</span>
          </span>
          <span className="hidden md:inline-block border border-primary/30 px-1.5 py-0.5 text-[10px] font-mono text-primary bg-primary/10 hud-cut-sm">
            DB_CHALLENGE
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          <li>
            <a href="#module" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              MODULE
            </a>
          </li>
          <li>
            <a href="#schedule" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              SCHEDULE
            </a>
          </li>
          <li>
            <a href="#rules" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              RULES
            </a>
          </li>
          <li>
            <a href="#rounds" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              ROUNDS_&_PDFS
            </a>
          </li>
          <li>
            <a href="#faqs" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              FAQS
            </a>
          </li>
          <li>
            <a href="#socials" className="nav-link font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors">
              REGISTER
            </a>
          </li>
        </ul>

        {/* Action Controls & Protected Judge Access */}
        <div className="flex items-center gap-3">
          {/* Judge Login / Status */}
          {isJudgeLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] hud-cut-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>JUDGE: AZHA NADEEM</span>
              </span>
              <button
                onClick={logoutJudge}
                className="p-1.5 border border-primary/30 hover:border-red-500 bg-card/60 text-muted-foreground hover:text-red-400 hud-cut-sm"
                title="Logout Judge Mode"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold tracking-[0.14em] text-muted-foreground border border-primary/30 hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/10 transition-all hud-cut-sm"
              title="Restricted Judge Login (Password Protected)"
            >
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>JUDGE_LOGIN</span>
            </button>
          )}

          {/* Direct Google Form Registration Button */}
          <a
            href="https://docs.google.com/forms/d/1IfT-lgoDO5-VoD6QSxVdvrpDqiMgsEncvDtGmwmvh2U/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-primary px-4 py-2 font-mono text-xs font-bold tracking-[0.16em] text-white transition-all hover:glow-primary hud-cut-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot"></span>
            REGISTER_NOW
          </a>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md border border-primary/30 p-2 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-primary/30 bg-[#0d0707] px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-primary/20">
            <span className="font-mono text-xs text-muted-foreground">STATUS:</span>
            <span className="font-mono text-xs text-primary font-bold">{currentUser.name}</span>
          </div>
          <div>
            {isJudgeLoggedIn ? (
              <button
                onClick={() => {
                  logoutJudge();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 font-mono text-xs font-bold text-center border border-red-500/40 bg-red-950/30 text-red-300 hud-cut-sm"
              >
                LOGOUT JUDGE MODE
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 font-mono text-xs font-bold text-center border border-amber-500/40 bg-amber-950/30 text-amber-300 hud-cut-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                ENTER AS JUDGE (PASSWORD REQUIRED)
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="#module"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              // MODULE
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              // SCHEDULE
            </a>
            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              // RULES
            </a>
            <a
              href="#rounds"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              // ROUNDS & PDFS
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              // FAQS
            </a>
            <a
              href="https://docs.google.com/forms/d/1IfT-lgoDO5-VoD6QSxVdvrpDqiMgsEncvDtGmwmvh2U/edit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs p-2 text-primary font-bold hover:bg-primary/10"
            >
              // REGISTER_FORM
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
