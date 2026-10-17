'use client';

import React, { useState } from 'react';
import { useRole } from './AuthProvider';
import { ShieldCheck, Lock, X, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function JudgeLoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAsJudge } = useRole();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await loginAsJudge(password);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid Judge Password. Access denied.');
    } else {
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md border border-amber-500/50 bg-[#120a0a] p-6 hud-cut-lg shadow-[0_0_35px_rgba(245,158,11,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 hud-cut-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                AUTHENTICATION REQUIRED
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Judge Portal Login
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">
          Access to PDF publication and evaluator controls is strictly restricted to verified jury members.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-muted-foreground uppercase mb-1">
              Enter Judge Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Paste judge secret passkey"
                className="w-full border border-amber-500/40 bg-background px-3 py-2.5 pr-10 font-mono text-xs text-foreground focus:border-amber-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 border border-red-500/50 bg-red-950/40 text-red-300 font-mono text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground border border-primary/20"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading || !password}
              className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] disabled:opacity-50 hud-cut-sm flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'AUTHENTICATING...' : 'ENTER AS JUDGE'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
