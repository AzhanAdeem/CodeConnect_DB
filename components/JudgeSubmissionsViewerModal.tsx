'use client';

import React, { useState, useEffect } from 'react';
import { ParticipantSubmission } from '@/lib/types';
import { X, ExternalLink, Copy, Check, Database, RefreshCw, Mail, Search, FileText } from 'lucide-react';

interface JudgeSubmissionsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JudgeSubmissionsViewerModal({
  isOpen,
  onClose,
}: JudgeSubmissionsViewerModalProps) {
  const [submissions, setSubmissions] = useState<ParticipantSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedRound, setSelectedRound] = useState<'all' | 'round-1' | 'round-2'>('all');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (res.ok && data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (e) {
      console.error('Error fetching submissions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubmissions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = submissions.filter((sub) => {
    const matchesRound = selectedRound === 'all' || sub.roundId === selectedRound;
    const matchesSearch =
      searchFilter === '' ||
      sub.teamName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      sub.leadEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
      sub.university.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesRound && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl border border-amber-500/50 bg-[#120707] p-6 hud-cut-lg shadow-[0_0_40px_rgba(245,158,11,0.25)] my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/30">
          <div>
            <div className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
              ORGANIZER &amp; JURY CONSOLE // AZHA NADEEM
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-foreground">
              Participant Submissions &amp; Drive Links
            </h3>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              All participant Google Drive links, ERDs, and SQL scripts are logged here and at{' '}
              <span className="text-amber-300">azhanadeem999@gmail.com</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSubmissions}
              disabled={loading}
              className="p-2 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hud-cut-sm"
              title="Refresh submissions list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedRound('all')}
              className={`px-3 py-1 font-mono text-xs hud-cut-sm border ${
                selectedRound === 'all'
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-primary/20 text-muted-foreground'
              }`}
            >
              ALL ({submissions.length})
            </button>
            <button
              onClick={() => setSelectedRound('round-1')}
              className={`px-3 py-1 font-mono text-xs hud-cut-sm border ${
                selectedRound === 'round-1'
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-primary/20 text-muted-foreground'
              }`}
            >
              ROUND 01 ({submissions.filter((s) => s.roundId === 'round-1').length})
            </button>
            <button
              onClick={() => setSelectedRound('round-2')}
              className={`px-3 py-1 font-mono text-xs hud-cut-sm border ${
                selectedRound === 'round-2'
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-primary/20 text-muted-foreground'
              }`}
            >
              ROUND 02 ({submissions.filter((s) => s.roundId === 'round-2').length})
            </button>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search team or email..."
              className="w-full pl-8 pr-3 py-1.5 border border-primary/20 bg-background text-xs font-mono text-foreground focus:border-amber-400 outline-none"
            />
          </div>
        </div>

        {/* Submissions list */}
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-primary/30 p-6 font-mono text-xs text-muted-foreground">
              {loading ? 'Fetching submissions from database...' : 'No submissions recorded yet.'}
            </div>
          ) : (
            filtered.map((sub) => {
              const driveLink = sub.erdLink || sub.presentationDeckUrl;
              return (
                <div
                  key={sub.id}
                  className="border border-primary/30 bg-[#160b0b] p-4 hud-cut-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-primary/15 gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase mr-2 border border-amber-500/30 px-1.5 py-0.2 bg-amber-500/10">
                        {sub.roundId.toUpperCase()}
                      </span>
                      <strong className="font-display text-lg text-foreground uppercase">
                        {sub.teamName}
                      </strong>
                      <span className="font-mono text-xs text-muted-foreground ml-2">
                        · {sub.university}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {new Date(sub.submittedAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <span className="text-muted-foreground">Team Lead: </span>
                      <span className="text-foreground font-semibold">{sub.leadName}</span> (
                      <a href={`mailto:${sub.leadEmail}`} className="text-primary hover:underline">
                        {sub.leadEmail}
                      </a>
                      )
                    </div>

                    {/* Google Drive / ERD Link */}
                    <div>
                      <span className="text-muted-foreground">Drive / ERD Link: </span>
                      {driveLink ? (
                        <a
                          href={driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold underline truncate max-w-[280px]"
                        >
                          <span className="truncate">{driveLink}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">None provided</span>
                      )}
                    </div>
                  </div>

                  {/* SQL Code Preview & Copy */}
                  {sub.sqlCode && (
                    <div className="mt-2 border border-primary/20 bg-background/80 p-3 font-mono text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-primary/10 mb-2">
                        <span className="text-primary font-bold text-[11px] flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" />
                          SQL CODE / DDL PAYLOAD ({sub.sqlCode.split('\n').length} lines)
                        </span>
                        <button
                          onClick={() => copyToClipboard(sub.sqlCode || '', sub.id)}
                          className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground border border-primary/20"
                        >
                          {copiedId === sub.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>COPY SQL</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[11px] text-foreground/80 max-h-36 overflow-y-auto whitespace-pre-wrap font-mono">
                        {sub.sqlCode}
                      </pre>
                    </div>
                  )}

                  {/* Notes / Documentation */}
                  {(sub.notes || sub.normalizationNotes || sub.queryNotes) && (
                    <div className="font-mono text-[11px] text-muted-foreground bg-background/40 p-2 border border-primary/15">
                      <strong className="text-accent">Notes: </strong>
                      {sub.notes || sub.normalizationNotes || sub.queryNotes}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <span>
            Storage Location: <strong className="text-foreground">data/submissions.json</strong>
          </span>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 font-mono text-xs font-bold tracking-widest hud-cut-sm"
          >
            CLOSE CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
}
