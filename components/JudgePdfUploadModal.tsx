'use client';

import React, { useState } from 'react';
import { useRole } from './AuthProvider';
import { RoundInfo } from '@/lib/types';
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface JudgePdfUploadModalProps {
  round: RoundInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedRound: RoundInfo) => void;
}

export default function JudgePdfUploadModal({
  round,
  isOpen,
  onClose,
  onSuccess,
}: JudgePdfUploadModalProps) {
  const { isJudgeLoggedIn, currentUser } = useRole();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customFilename, setCustomFilename] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !round) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCustomFilename(file.name);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!isJudgeLoggedIn) {
      setErrorMsg('ACCESS FORBIDDEN: Only authenticated Judges can upload round PDF problem statements.');
      return;
    }

    const filenameToUse =
      customFilename.trim() ||
      (selectedFile ? selectedFile.name : `CodeConnect26_Round${round.number}_OfficialPrompt.pdf`);

    setIsUploading(true);

    try {
      const savedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('cc26_judge_auth') : null;
      const res = await fetch('/api/judge/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-judge-auth': savedAuth || 'rudolph-insists-demanded-citation-convent-pairing-aztec',
        },
        body: JSON.stringify({
          roundId: round.id,
          filename: filenameToUse,
          uploadedBy: currentUser.name || 'Azha Nadeem (Jury / Organizer)',
          url: `/docs/${filenameToUse}`,
          size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
          password: 'rudolph-insists-demanded-citation-convent-pairing-aztec',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccessMsg(data.message || 'PDF published successfully to all participants!');
      setTimeout(() => {
        onSuccess(data.round);
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error uploading PDF file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg border border-amber-500/50 bg-[#120a0a] p-6 hud-cut-lg shadow-[0_0_35px_rgba(245,158,11,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 hud-cut-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                JUDGE PRIVILEGE // AZHA NADEEM
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Upload PDF for Round {round.number}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleUpload} className="mt-5 space-y-4">
          <div className="border border-primary/20 bg-background/50 p-3 font-mono text-xs">
            <div className="text-muted-foreground">ROUND:</div>
            <div className="text-foreground font-bold">{round.title}</div>
            <div className="text-primary text-[11px] mt-1">{round.tagline}</div>
          </div>

          {/* Current Active PDF status */}
          {round.judgePdf && (
            <div className="flex items-center justify-between border border-border bg-card/60 p-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-foreground">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="truncate max-w-[240px]">{round.judgePdf.filename}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">CURRENTLY LIVE</span>
            </div>
          )}

          {/* Drag & Drop Upload Zone */}
          <div className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-[#180e0e] p-6 text-center cursor-pointer transition-colors relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <UploadCloud className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <div className="font-mono text-xs text-foreground font-semibold">
              {selectedFile ? selectedFile.name : 'Click or drag PDF problem brief here'}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground mt-1">
              Supports .pdf up to 25 MB · Automatic publication to participants
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1 uppercase">
              Document Display Name / Title
            </label>
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              placeholder={`CodeConnect26_Round${round.number}_OfficialPrompt.pdf`}
              className="w-full border border-primary/30 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1 uppercase">
              Authorized Evaluator (Judge Name)
            </label>
            <input
              type="text"
              readOnly
              value={currentUser.name}
              className="w-full border border-primary/20 bg-background/50 px-3 py-2 font-mono text-xs text-muted-foreground"
            />
          </div>

          {errorMsg && (
            <div className="p-3 border border-red-500/50 bg-red-950/30 text-red-300 font-mono text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground border border-primary/20"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] disabled:opacity-50"
            >
              {isUploading ? 'UPLOADING...' : 'PUBLISH ROUND PDF'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
