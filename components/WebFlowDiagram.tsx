'use client';

import React, { useState } from 'react';
import {
  X,
  Workflow,
  Database,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  User,
  ArrowRight,
  CheckCircle2,
  Server,
  Cloud,
} from 'lucide-react';

interface WebFlowDiagramProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebFlowDiagram({ isOpen, onClose }: WebFlowDiagramProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Participant / Judge Access',
      actor: 'Two Distinct UX Roles',
      desc: 'Participants register & log in. Judges access exclusive evaluation panels & round PDF publication rights.',
      tech: 'Next.js 14 App Router + NextAuth.js (Google & GitHub OAuth)',
      code: `// NextAuth Session
const session = await getServerSession(authOptions);
const isJudge = session?.user?.role === 'judge';`,
    },
    {
      title: '2. Next.js on Vercel Hosting',
      actor: 'Edge Frontend & Serverless Compute',
      desc: 'Fast, globally distributed landing page, live countdown, terminal HUD, and secure API routes hosted on Vercel.',
      tech: 'Vercel Serverless Functions + Edge CDN',
      code: `export const runtime = 'nodejs'; // or 'edge'
export async function POST(req: Request) { ... }`,
    },
    {
      title: '3. API Routes & Split Storage Strategy',
      actor: 'Dual-Path Storage Architecture',
      desc: 'Rounds 1 & 2 (Online): SQL code & schemas stored in dedicated database. Round 3 (On-Campus): Evaluated live at UBIT, so no code DB is needed.',
      tech: 'Postgres / Supabase Submission Database',
      code: `// Rounds 1 & 2: Store Code
if (roundId === 'round-1' || roundId === 'round-2') {
  await db.submissions.create({ data: { sqlCode, erdLink, ... } });
}`,
    },
    {
      title: '4. n8n Webhook Trigger',
      actor: 'Automated Workflow Engine',
      desc: 'Vercel API routes fire an asynchronous webhook to n8n containing metadata ONLY (team name, lead email, round, code lines count, timestamp). Code payloads are intentionally withheld.',
      tech: 'n8n Workflow Automation Engine',
      code: `// n8n Webhook Payload (Metadata Only)
await fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    event: 'SUBMISSION_RECEIVED',
    metadata: { roundId, teamName, leadEmail, lineCount, codeInDb: true }
  })
});`,
    },
    {
      title: '5. Google Sheets via Apps Script API',
      actor: 'Jury Coordination Spreadsheet',
      desc: 'n8n calls the Google Apps Script Web App / Sheets API to append a lightweight row for real-time monitoring by the UBIT jury.',
      tech: 'Google Sheets + Google Apps Script REST API',
      code: `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
  sheet.appendRow([data.timestamp, data.roundId, data.teamName, data.leadEmail, data.status]);
  return ContentService.createTextOutput("OK");
}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl border border-primary/50 bg-[#120707] p-6 sm:p-8 hud-cut-lg shadow-[0_0_50px_rgba(239,59,59,0.3)] my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/25">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-primary/40 bg-primary/10 text-primary hud-cut-sm">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                SYSTEM ARCHITECTURE &amp; DATA PIPELINE
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                Hackathon Web Flow Specification
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

        {/* Visual Pipeline Bar */}
        <div className="mt-6 p-4 border border-primary/30 bg-background/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-2 font-mono text-[11px]">
            <div className="border border-primary/40 bg-primary/10 px-3 py-2 text-center text-foreground font-bold">
              <User className="w-4 h-4 mx-auto mb-1 text-primary" />
              Participant
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0" />

            <div className="border border-primary/40 bg-primary/10 px-3 py-2 text-center text-foreground font-bold">
              <Cloud className="w-4 h-4 mx-auto mb-1 text-accent" />
              Next.js on Vercel
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0" />

            <div className="border border-primary/40 bg-primary/10 px-3 py-2 text-center text-foreground font-bold">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              NextAuth (Google/GitHub)
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0" />

            <div className="border border-primary/40 bg-[#1e0a0a] px-3 py-2 text-center text-foreground font-bold">
              <Server className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
              API Routes / n8n Webhook
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0" />

            <div className="border border-emerald-500/50 bg-emerald-950/30 px-3 py-2 text-center text-emerald-300 font-bold">
              <FileSpreadsheet className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              Google Sheets (Metadata Only)
            </div>
          </div>
        </div>

        {/* Storage Decision Highlights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="border border-cyan-500/40 bg-cyan-950/20 p-4 hud-cut-sm">
            <div className="text-cyan-400 font-bold flex items-center gap-2 mb-1">
              <Database className="w-4 h-4" />
              ROUNDS 1 &amp; 2 (ONLINE): CODE DATABASE STORAGE
            </div>
            <p className="text-foreground/85 font-sans text-xs leading-relaxed">
              Full SQL statements, DDL schemas, and ERD URLs are committed into the Hackathon SQL database so judges can inspect normalization and run query plans asynchronously.
            </p>
          </div>

          <div className="border border-amber-500/40 bg-amber-950/20 p-4 hud-cut-sm">
            <div className="text-amber-400 font-bold flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4" />
              ROUND 3 (ON-CAMPUS @ UBIT): NO CODE DB REQUIRED
            </div>
            <p className="text-foreground/85 font-sans text-xs leading-relaxed">
              Teams present live in the UBIT auditorium before the jury. Architecture diagrams, sharding blueprints, and CAP theorem defense are evaluated in-person.
            </p>
          </div>
        </div>

        {/* Interactive Step Explorer */}
        <div className="mt-6 border border-primary/25 bg-card/60 p-5">
          <div className="flex gap-2 border-b border-primary/20 pb-3 overflow-x-auto">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1 font-mono text-xs whitespace-nowrap transition-colors ${
                  activeStep === idx
                    ? 'border-b-2 border-primary text-primary font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.title.split('.')[0]}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-display text-lg font-bold text-foreground uppercase">
              {steps[activeStep].title}
            </h4>
            <div className="font-mono text-xs text-primary font-semibold mt-0.5">
              Role / Subsystem: {steps[activeStep].actor}
            </div>
            <p className="font-sans text-sm text-foreground/90 mt-2 leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="mt-3">
              <div className="font-mono text-[10px] text-muted-foreground uppercase mb-1">
                Implementation Blueprint:
              </div>
              <pre className="p-3 bg-[#090404] border border-primary/20 text-xs font-mono text-foreground/80 overflow-x-auto">
                {steps[activeStep].code}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 font-mono text-xs font-bold tracking-widest hud-cut-sm"
          >
            CLOSE SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}
