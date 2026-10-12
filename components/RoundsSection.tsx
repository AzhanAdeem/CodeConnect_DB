'use client';

import React, { useState } from 'react';
import { useRole } from './AuthProvider';
import { RoundInfo } from '@/lib/types';
import { ROUNDS_DATA } from '@/lib/data';
import JudgePdfUploadModal from './JudgePdfUploadModal';
import ParticipantSubmissionModal from './ParticipantSubmissionModal';
import {
  FileText,
  Upload,
  Download,
  ShieldCheck,
  Code2,
  Lock,
} from 'lucide-react';

export default function RoundsSection() {
  const { role } = useRole();
  const [rounds, setRounds] = useState<RoundInfo[]>(ROUNDS_DATA);

  // Modal states
  const [activeJudgeModalRound, setActiveJudgeModalRound] = useState<RoundInfo | null>(null);
  const [activeParticipantModalRound, setActiveParticipantModalRound] = useState<RoundInfo | null>(null);

  const handlePdfUploadSuccess = (updatedRound: RoundInfo) => {
    setRounds((prev) =>
      prev.map((r) => (r.id === updatedRound.id ? updatedRound : r))
    );
  };

  return (
    <section id="rounds" className="relative py-24 bg-background border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title & Role Banner (Subtext removed as requested) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              THE 3-STAGE EVOLUTION
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
              Rounds Description &amp; Problem Sets
            </h2>
          </div>

          {/* Active UX Mode indicator */}
          <div className="flex items-center gap-3 p-3 border border-primary/30 bg-card/60 hud-cut-sm">
            <div className="font-mono text-xs">
              <span className="text-muted-foreground">ACTIVE PERSPECTIVE: </span>
              <strong className={role === 'judge' ? 'text-amber-400' : 'text-primary'}>
                {role === 'judge' ? 'JUDGE UX' : 'PARTICIPANT UX'}
              </strong>
            </div>
            {role === 'judge' ? (
              <span className="font-mono text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5">
                PDF Upload Enabled
              </span>
            ) : (
              <span className="font-mono text-[10px] bg-primary/20 text-primary border border-primary/40 px-2 py-0.5">
                Download &amp; Submit Mode
              </span>
            )}
          </div>
        </div>

        {/* 3 Rounds List */}
        <div className="mt-14 space-y-12">
          {rounds.map((round) => (
            <div
              key={round.id}
              className={`relative border bg-[#110808] p-6 sm:p-8 hud-cut-lg transition-all ${
                round.id === 'round-3'
                  ? 'border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.12)]'
                  : 'border-primary/35 shadow-[0_0_25px_rgba(239,59,59,0.12)]'
              }`}
            >
              <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary" />

              {/* Round Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-primary/20 gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary/10 text-primary font-display text-xl font-bold hud-cut-sm">
                    0{round.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                        ROUND 0{round.number} // {round.level.toUpperCase()}
                      </span>
                      <span className="border border-primary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-primary/10">
                        {round.venueType}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
                      {round.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="border border-primary/30 bg-background/50 px-3 py-1 text-foreground/80">
                    DATE: {round.date}
                  </span>
                  <span
                    className={`border px-3 py-1 font-bold ${
                      round.requiresCodeStorage
                        ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20'
                        : 'border-amber-500/40 text-amber-300 bg-amber-950/20'
                    }`}
                  >
                    {round.requiresCodeStorage
                      ? 'ONLINE SUBMISSION ON PORTAL'
                      : 'DAY 3 ON-CAMPUS PITCH @ UBIT'}
                  </span>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Left: Narrative, Tasks & Skills */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1">
                      // SCENARIO &amp; BUSINESS STORY
                    </h4>
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                      {round.story}
                    </p>
                  </div>

                  <div className="border-l-2 border-primary/60 pl-4 py-1">
                    <h4 className="font-mono text-xs font-bold tracking-widest text-accent uppercase mb-1">
                      // ENGINEERING TASK
                    </h4>
                    <p className="text-sm text-foreground/85 leading-relaxed font-sans">
                      {round.task}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">
                      KEY TESTED COMPETENCIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {round.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="border border-primary/25 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-foreground/90 hud-cut-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scale metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="border border-primary/20 bg-background/40 p-2.5">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        CUSTOMER BASE
                      </div>
                      <div className="font-display text-base font-bold text-foreground">
                        {round.scaleStats.customers}
                      </div>
                    </div>
                    <div className="border border-primary/20 bg-background/40 p-2.5">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        RESTAURANTS / HUBS
                      </div>
                      <div className="font-display text-base font-bold text-foreground">
                        {round.scaleStats.restaurants}
                      </div>
                    </div>
                    {round.scaleStats.riders && (
                      <div className="border border-primary/20 bg-background/40 p-2.5 col-span-2 sm:col-span-1">
                        <div className="font-mono text-[10px] text-muted-foreground uppercase">
                          DISPATCH FLEET
                        </div>
                        <div className="font-display text-base font-bold text-foreground">
                          {round.scaleStats.riders}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: PDF Problem Statement & Role Interactions */}
                <div className="flex flex-col justify-between border border-primary/25 bg-card/40 p-6 hud-cut-md">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-primary/20">
                      <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        OFFICIAL ROUND PDF
                      </span>
                      {round.judgePdf ? (
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2 py-0.5">
                          PUBLISHED
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/40 px-2 py-0.5">
                          PENDING PDF
                        </span>
                      )}
                    </div>

                    {/* PDF Card status */}
                    {round.judgePdf ? (
                      <div className="mt-4 border border-primary/30 bg-background/70 p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-mono text-xs font-bold text-foreground truncate max-w-[220px]">
                            {round.judgePdf.filename}
                          </div>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {round.judgePdf.size}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-muted-foreground">
                          Uploaded By: <span className="text-foreground">{round.judgePdf.uploadedBy}</span>
                        </div>
                        <div className="font-mono text-[10px] text-primary/80">
                          Timestamp: {round.judgePdf.uploadedAt}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 border border-dashed border-primary/30 p-4 text-center font-mono text-xs text-muted-foreground">
                        No official PDF prompt has been uploaded for Round {round.number} yet.
                      </div>
                    )}

                    {/* Specific Action: PDF Upload option ONLY FOR THE JUDGE */}
                    <div className="mt-6 pt-4 border-t border-primary/20">
                      {role === 'judge' ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400 font-bold uppercase">
                            <ShieldCheck className="w-4 h-4" />
                            <span>JUDGE PRIVILEGE: PDF UPLOAD ACTIVE</span>
                          </div>
                          <button
                            onClick={() => setActiveJudgeModalRound(round)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hud-cut-sm"
                          >
                            <Upload className="w-4 h-4" />
                            <span>
                              {round.judgePdf ? 'REPLACE ROUND PDF BRIEF' : 'UPLOAD ROUND PDF BRIEF'}
                            </span>
                          </button>
                          <p className="font-mono text-[10px] text-muted-foreground text-center">
                            Only verified Judges can upload or modify official round briefs.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {round.judgePdf ? (
                            <a
                              href={round.judgePdf.url}
                              download={round.judgePdf.filename}
                              className="w-full inline-flex items-center justify-center gap-2 border border-primary/60 hover:border-primary bg-primary/10 hover:bg-primary/20 text-foreground px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all hud-cut-sm"
                            >
                              <Download className="w-4 h-4 text-primary" />
                              <span>DOWNLOAD PROBLEM BRIEF (PDF)</span>
                            </a>
                          ) : (
                            <button
                              disabled
                              className="w-full border border-primary/20 bg-background/50 text-muted-foreground px-4 py-3 font-mono text-xs tracking-widest uppercase cursor-not-allowed"
                            >
                              PDF NOT YET RELEASED
                            </button>
                          )}
                          <div className="flex items-center justify-center gap-1 font-mono text-[10px] text-muted-foreground">
                            <Lock className="w-3 h-3 text-primary" />
                            <span>PDF upload option is restricted to verified Judges.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Participant Submission Action */}
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <button
                      onClick={() => setActiveParticipantModalRound(round)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all hover:glow-primary hud-cut-sm shadow-md"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>
                        {round.number === 1 && 'SUBMIT ROUND 01 (RELATIONAL DDL & ERD)'}
                        {round.number === 2 && 'SUBMIT ROUND 02 (TRANSACTIONS & INDEXING)'}
                        {round.number === 3 && 'SUBMIT ROUND 03 (ON-CAMPUS DECK & ARCHITECTURE)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <JudgePdfUploadModal
        round={activeJudgeModalRound}
        isOpen={Boolean(activeJudgeModalRound)}
        onClose={() => setActiveJudgeModalRound(null)}
        onSuccess={handlePdfUploadSuccess}
      />

      <ParticipantSubmissionModal
        round={activeParticipantModalRound}
        isOpen={Boolean(activeParticipantModalRound)}
        onClose={() => setActiveParticipantModalRound(null)}
        onSuccess={() => {}}
      />
    </section>
  );
}
