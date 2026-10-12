'use client';

import React, { useState, useEffect } from 'react';
import { RoundInfo } from '@/lib/types';
import {
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Layers,
  Database,
  Lock,
  ExternalLink,
  Presentation,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParticipantSubmissionModalProps {
  round: RoundInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ParticipantSubmissionModal({
  round,
  isOpen,
  onClose,
  onSuccess,
}: ParticipantSubmissionModalProps) {
  // Shared base fields - all empty, NO dummy prefilled text
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [university, setUniversity] = useState('');

  // Round 1 specific fields
  const [r1ErdLink, setR1ErdLink] = useState('');
  const [r1SqlCode, setR1SqlCode] = useState('');
  const [r1NormalizationNotes, setR1NormalizationNotes] = useState('');

  // Round 2 specific fields
  const [r2ErdLink, setR2ErdLink] = useState('');
  const [r2SchemaSql, setR2SchemaSql] = useState('');
  const [r2IndexingSql, setR2IndexingSql] = useState('');
  const [r2TransactionsSql, setR2TransactionsSql] = useState('');
  const [r2QueryNotes, setR2QueryNotes] = useState('');

  // Round 3 specific fields
  const [r3DeckUrl, setR3DeckUrl] = useState('');
  const [r3ScalingSummary, setR3ScalingSummary] = useState('');
  const [r3ConcurrencyPlan, setR3ConcurrencyPlan] = useState('');
  const [r3PresenterNames, setR3PresenterNames] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);
  const [existingSubmissionData, setExistingSubmissionData] = useState<any>(null);

  // Reset fields when opening modal for a round
  useEffect(() => {
    if (isOpen && round) {
      setErrorMsg('');
      setSubmissionResult(null);
      setHasAlreadySubmitted(false);

      // Check localStorage to see if this team/browser has submitted for this round
      try {
        const localRecord = localStorage.getItem(`submitted_${round.id}`);
        if (localRecord) {
          const parsed = JSON.parse(localRecord);
          setHasAlreadySubmitted(true);
          setExistingSubmissionData(parsed);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen, round]);

  if (!isOpen || !round) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (hasAlreadySubmitted) {
      setErrorMsg('This team has already submitted for this round. Only a single submission is allowed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload based on round number
      const payload: any = {
        roundId: round.id,
        teamName: teamName.trim(),
        leadName: leadName.trim(),
        leadEmail: leadEmail.trim(),
        university: university.trim(),
      };

      if (round.number === 1) {
        payload.erdLink = r1ErdLink.trim();
        payload.sqlCode = r1SqlCode.trim();
        payload.normalizationNotes = r1NormalizationNotes.trim();
        payload.notes = r1NormalizationNotes.trim();
      } else if (round.number === 2) {
        payload.erdLink = r2ErdLink.trim();
        payload.updatedSchemaSql = r2SchemaSql.trim();
        payload.indexingStrategySql = r2IndexingSql.trim();
        payload.transactionsSql = r2TransactionsSql.trim();
        payload.sqlCode = `${r2SchemaSql}\n\n-- INDEXING STRATEGY --\n${r2IndexingSql}\n\n-- TRANSACTIONS & STORED PROCEDURES --\n${r2TransactionsSql}`;
        payload.queryNotes = r2QueryNotes.trim();
        payload.notes = r2QueryNotes.trim();
      } else if (round.number === 3) {
        payload.presentationDeckUrl = r3DeckUrl.trim();
        payload.scalingArchitectureSummary = r3ScalingSummary.trim();
        payload.concurrencyPlan = r3ConcurrencyPlan.trim();
        payload.presenterNames = r3PresenterNames.trim();
        payload.notes = `Deck: ${r3DeckUrl} | Presenters: ${r3PresenterNames}`;
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit solution');
      }

      // Mark single submission in localStorage to permanently lock further submissions
      try {
        localStorage.setItem(
          `submitted_${round.id}`,
          JSON.stringify({
            teamName: payload.teamName,
            leadEmail: payload.leadEmail,
            submissionId: data.submissionId,
            timestamp: new Date().toISOString(),
          })
        );
      } catch (e) {
        // ignore
      }

      setSubmissionResult(data);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl border border-primary/50 bg-[#120707] p-6 hud-cut-lg shadow-[0_0_40px_rgba(239,59,59,0.25)] my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/25">
          <div>
            <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
              OFFICIAL SUBMISSION PORTAL // ROUND 0{round.number}
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-foreground">
              {round.title}
            </h3>
            <div className="font-mono text-xs text-accent mt-0.5">{round.tagline}</div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STRICT WARNING MESSAGE: SINGLE SUBMISSION POLICY */}
        <div className="mt-4 border-2 border-red-500/80 bg-red-950/40 p-4 hud-cut-sm flex items-start gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="font-mono text-xs text-red-200">
            <strong className="text-white font-bold block uppercase tracking-wide">
              WARNING: STRICT SINGLE SUBMISSION POLICY
            </strong>
            Only <span className="text-red-300 font-bold underline">ONE (1) submission</span> per team
            is allowed for this round. Once submitted, your solution is permanently locked and cannot
            be edited or resubmitted. Verify all SQL schemas, queries, and links before submitting.
          </div>
        </div>

        {/* Already Submitted Locked State */}
        {hasAlreadySubmitted && existingSubmissionData ? (
          <div className="mt-6 py-8 text-center space-y-4 border border-amber-500/40 bg-[#160d0d] p-6 hud-cut-md">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold text-foreground uppercase">
              Submission Locked for Round {round.number}
            </h4>
            <p className="font-mono text-xs text-amber-300/90 max-w-md mx-auto">
              Your team <strong className="text-white">({existingSubmissionData.teamName})</strong> has
              already submitted for this round on{' '}
              {new Date(existingSubmissionData.timestamp).toLocaleString()}.
            </p>
            <div className="font-mono text-[11px] text-muted-foreground border border-primary/20 bg-background/50 p-2 max-w-xs mx-auto">
              RECORD ID: {existingSubmissionData.submissionId}
            </div>
            <button
              onClick={onClose}
              className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 font-mono text-xs font-bold tracking-widest hud-cut-sm"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : submissionResult ? (
          /* Submission Success State */
          <div className="mt-6 py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-display text-2xl font-bold text-foreground uppercase">
              Submission Received &amp; Stored Successfully!
            </h4>
            <p className="font-mono text-xs text-muted-foreground max-w-md mx-auto">
              {submissionResult.message}
            </p>
            <div className="border border-emerald-500/40 bg-emerald-950/20 p-4 text-left font-mono text-xs text-emerald-200">
              <div>STATUS: Locked (Single submission recorded)</div>
              <div>SUBMISSION ID: {submissionResult.submissionId}</div>
              <div>TIMESTAMP: {new Date().toLocaleString()}</div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 font-mono text-xs font-bold tracking-widest hud-cut-sm"
            >
              DONE &amp; CLOSE
            </button>
          </div>
        ) : (
          /* Submission Form - Custom tailored for Round 1, Round 2, or Round 3 */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Common Team Identification Fields (clean, no dummy data) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your registered team name"
                  className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                  University / Institute *
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. UBIT, FAST, NED, IBA, NUST..."
                  className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                  Team Lead Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Full name of team lead"
                  className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                  Team Lead Email *
                </label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="lead@university.edu.pk"
                  className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* ROUND 1 FORM: The Garage Days (Beginner) */}
            {round.number === 1 && (
              <div className="space-y-4 pt-2 border-t border-primary/20">
                <div className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  ROUND 01 SPECIFIC REQUIREMENTS (RELATIONAL GENESIS &amp; 3NF)
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    ERD Diagram Public URL * (dbdocs.io / drawSQL / Figma / Google Drive)
                  </label>
                  <input
                    type="url"
                    required
                    value={r1ErdLink}
                    onChange={(e) => setR1ErdLink(e.target.value)}
                    placeholder="https://dbdocs.io/your-team/r1-erd or https://drawsql.app/..."
                    className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-[11px] text-primary font-bold uppercase">
                      Core Relational SQL Schema &amp; DDL Statements *
                    </label>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      CREATE TABLE, Primary &amp; Foreign Keys, Constraints
                    </span>
                  </div>
                  <textarea
                    rows={7}
                    required
                    value={r1SqlCode}
                    onChange={(e) => setR1SqlCode(e.target.value)}
                    placeholder="-- Paste your clean SQL DDL script here:
CREATE TABLE customers ( ... );
CREATE TABLE restaurants ( ... );
CREATE TABLE menu_items ( ... );
CREATE TABLE orders ( ... );"
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Normalization Justification (1NF, 2NF, 3NF Explanation)
                  </label>
                  <textarea
                    rows={2}
                    value={r1NormalizationNotes}
                    onChange={(e) => setR1NormalizationNotes(e.target.value)}
                    placeholder="Briefly explain how you eliminated partial and transitive functional dependencies..."
                    className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {/* ROUND 2 FORM: The Expansion (Intermediate) */}
            {round.number === 2 && (
              <div className="space-y-4 pt-2 border-t border-primary/20">
                <div className="font-mono text-xs font-bold text-accent uppercase flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-accent" />
                  ROUND 02 SPECIFIC REQUIREMENTS (M:M, INDEXING &amp; TRANSACTIONS)
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Updated Multi-City ERD Diagram URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={r2ErdLink}
                    onChange={(e) => setR2ErdLink(e.target.value)}
                    placeholder="https://dbdocs.io/your-team/r2-expansion-erd"
                    className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    M:M Relations &amp; Multi-City Schema SQL * (Riders, Ratings, Payment Gateways)
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={r2SchemaSql}
                    onChange={(e) => setR2SchemaSql(e.target.value)}
                    placeholder="-- Paste your M:M Rider dispatch, ratings, and multi-channel payment tables..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    Indexing Strategy &amp; Benchmark Queries * (CREATE INDEX &amp; Joins)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={r2IndexingSql}
                    onChange={(e) => setR2IndexingSql(e.target.value)}
                    placeholder="-- Paste your composite / B-Tree index definitions and fast lookup queries..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    ACID Transaction &amp; Stored Procedure SQL * (Order Dispatch &amp; Payments)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={r2TransactionsSql}
                    onChange={(e) => setR2TransactionsSql(e.target.value)}
                    placeholder="-- Paste your transaction blocks (BEGIN...COMMIT), stored procedures, or triggers..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {/* ROUND 3 FORM: The Platform (Advanced / On-Campus Stage Defense) */}
            {round.number === 3 && (
              <div className="space-y-4 pt-2 border-t border-primary/20">
                <div className="font-mono text-xs font-bold text-amber-400 uppercase flex items-center gap-2">
                  <Presentation className="w-4 h-4 text-amber-400" />
                  ROUND 03 STAGE DEFENSE REGISTRATION (ON-CAMPUS @ UBIT)
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-amber-300 font-bold uppercase mb-1">
                    Presentation Slide Deck Link * (Google Slides / Canva / PDF Drive URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={r3DeckUrl}
                    onChange={(e) => setR3DeckUrl(e.target.value)}
                    placeholder="https://docs.google.com/presentation/d/... or Canva share link"
                    className="w-full border border-amber-500/40 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Platform Scaling Blueprint Summary * (Sharding, Caching &amp; SQL vs NoSQL)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={r3ScalingSummary}
                    onChange={(e) => setR3ScalingSummary(e.target.value)}
                    placeholder="Summarize your sharding keys, Redis caching tier, read-replicas, and why specific data is kept in SQL vs NoSQL for 1M users..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Ramadan Peak Concurrency &amp; Disaster Recovery Plan *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={r3ConcurrencyPlan}
                    onChange={(e) => setR3ConcurrencyPlan(e.target.value)}
                    placeholder="How will your architecture handle 10,000 orders/sec during Sehri/Iftar rushes without database lockups or double charges?"
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Designated Presenter Name(s) for On-Stage Jury Defense *
                  </label>
                  <input
                    type="text"
                    required
                    value={r3PresenterNames}
                    onChange={(e) => setR3PresenterNames(e.target.value)}
                    placeholder="Names of team members who will present on stage at UBIT"
                    className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 border border-red-500 bg-red-950/60 text-red-300 font-mono text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Action Controls */}
            <div className="pt-3 flex items-center justify-between border-t border-primary/20">
              <span className="font-mono text-[10px] text-muted-foreground">
                SUBMISSION IS FINAL &amp; LOCKED ONCE SENT
              </span>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground border border-primary/20"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 font-mono text-xs font-bold tracking-wider transition-all hover:glow-primary hud-cut-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? 'RECORDING SUBMISSION...'
                      : `CONFIRM & SUBMIT ROUND 0${round.number}`}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
