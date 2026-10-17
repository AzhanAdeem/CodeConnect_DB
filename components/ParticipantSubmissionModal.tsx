'use client';

import React, { useState, useEffect } from 'react';
import { RoundInfo } from '@/lib/types';
import {
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Database,
  Lock,
  Mail,
  ExternalLink,
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
  // Shared base fields - clean and empty (no dummy text)
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
        payload.sqlCode = `${r2SchemaSql}\n\n-- INDEXING & EXPLAIN --\n${r2IndexingSql}\n\n-- TRANSACTIONS & STORED PROCEDURES --\n${r2TransactionsSql}`;
        payload.queryNotes = r2QueryNotes.trim();
        payload.notes = r2QueryNotes.trim();
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
            be edited or resubmitted.
            <div className="mt-1 text-muted-foreground text-[11px]">
              Submissions and Google Drive links are recorded in database and directed to{' '}
              <span className="text-foreground font-semibold">azhanadeem999@gmail.com</span>.
            </div>
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
              Submission Successfully Recorded!
            </h4>
            <p className="font-mono text-xs text-muted-foreground max-w-md mx-auto">
              Your files and Google Drive links have been stored in the database and directed to{' '}
              <strong className="text-white">azhanadeem999@gmail.com</strong>.
            </p>
            <div className="border border-emerald-500/40 bg-emerald-950/20 p-4 text-left font-mono text-xs text-emerald-200 space-y-1">
              <div>STATUS: Locked (Single submission recorded)</div>
              <div>SUBMISSION ID: {submissionResult.submissionId}</div>
              <div>ORGANIZER DIRECT: azhanadeem999@gmail.com</div>
              <div className="truncate">GOOGLE DRIVE LINK: {submissionResult.driveLink}</div>
            </div>

            {/* Direct Mailto Backup Button */}
            {submissionResult.directMailtoUrl && (
              <div className="pt-2">
                <a
                  href={submissionResult.directMailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/50 px-4 py-2 font-mono text-xs font-bold hud-cut-sm transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Confirmation Email Copy to azhanadeem999@gmail.com</span>
                </a>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 font-mono text-xs font-bold tracking-widest hud-cut-sm"
            >
              DONE &amp; CLOSE
            </button>
          </div>
        ) : (
          /* Submission Form */
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

            {/* ROUND 1 FORM: Initial Design Submission */}
            {round.number === 1 && (
              <div className="space-y-4 pt-2 border-t border-primary/20">
                <div className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  ROUND 01 REQUIREMENTS (ERD, 2NF/3NF &amp; CORE SQL)
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-amber-300 font-bold uppercase mb-1">
                    Google Drive Folder / ERD Diagram Public URL * (Directed to azhanadeem999@gmail.com)
                  </label>
                  <input
                    type="url"
                    required
                    value={r1ErdLink}
                    onChange={(e) => setR1ErdLink(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/... (Set sharing to 'Anyone with link can view')"
                    className="w-full border border-amber-500/50 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-amber-400 outline-none"
                  />
                  <span className="font-mono text-[10px] text-muted-foreground mt-0.5 block">
                    Important: Ensure your Google Drive link or dbdocs/drawSQL link is publicly viewable.
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-[11px] text-primary font-bold uppercase">
                      Core SQL Schema &amp; DDL Statements *
                    </label>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      CREATE TABLE, Primary &amp; Foreign Keys, 2NF/3NF
                    </span>
                  </div>
                  <textarea
                    rows={7}
                    required
                    value={r1SqlCode}
                    onChange={(e) => setR1SqlCode(e.target.value)}
                    placeholder="-- Paste your clean SQL DDL script here:
CREATE TABLE customers ( ... );
CREATE TABLE dishes ( ... );
CREATE TABLE orders ( ... );
CREATE TABLE riders ( ... );"
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Normalization &amp; Relationship Notes (2NF, 3NF &amp; 1:1, 1:M, M:M)
                  </label>
                  <textarea
                    rows={2}
                    value={r1NormalizationNotes}
                    onChange={(e) => setR1NormalizationNotes(e.target.value)}
                    placeholder="Briefly explain how your design normalizes the garage operation..."
                    className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {/* ROUND 2 FORM: Optimization & Queries */}
            {round.number === 2 && (
              <div className="space-y-4 pt-2 border-t border-primary/20">
                <div className="font-mono text-xs font-bold text-accent uppercase flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-accent" />
                  ROUND 02 REQUIREMENTS (OPTIMIZATION, INDEXING, SHARDING &amp; TRANSACTIONS)
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-amber-300 font-bold uppercase mb-1">
                    Google Drive Folder / Solution Documents URL * (Directed to azhanadeem999@gmail.com)
                  </label>
                  <input
                    type="url"
                    required
                    value={r2ErdLink}
                    onChange={(e) => setR2ErdLink(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/... (Google Drive link with solution files)"
                    className="w-full border border-amber-500/50 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-amber-400 outline-none"
                  />
                  <span className="font-mono text-[10px] text-muted-foreground mt-0.5 block">
                    Ensure link permissions are set so judges can view your files without request access.
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    Scaled Schema SQL &amp; Views * (1M Users, 5 Cities, 50k Orders/Day)
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={r2SchemaSql}
                    onChange={(e) => setR2SchemaSql(e.target.value)}
                    placeholder="-- Paste your scaled database schema, views, and BCNF/4NF tables..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    Query Optimization &amp; Indexing Strategy * (EXPLAIN, B-Tree, Rewritten Queries)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={r2IndexingSql}
                    onChange={(e) => setR2IndexingSql(e.target.value)}
                    placeholder="-- Paste your indexing statements (CREATE INDEX) and query optimizations..."
                    className="w-full border border-primary/30 bg-[#090404] p-3 font-mono text-xs text-foreground/90 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-primary font-bold uppercase mb-1">
                    ACID Transactions &amp; Stored Procedures * (Concurrency &amp; Locking for Ramadan 10x Spikes)
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

                <div>
                  <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
                    Architecture Decisions Notes (Partitioning, Sharding, NoSQL vs SQL)
                  </label>
                  <textarea
                    rows={2}
                    value={r2QueryNotes}
                    onChange={(e) => setR2QueryNotes(e.target.value)}
                    placeholder="Explain trade-offs, caching (Redis), replication, or CAP theorem considerations..."
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
                SUBMISSION DIRECTED TO: azhanadeem999@gmail.com
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
                      ? 'DIRECTING TO ORGANIZER...'
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
