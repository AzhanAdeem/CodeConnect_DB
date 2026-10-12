'use client';

import React from 'react';
import {
  Database,
  TrendingUp,
  Server,
  CheckCircle2,
  Flame,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Cpu,
  Zap,
} from 'lucide-react';

export default function ModuleIntro() {
  const levels = [
    {
      level: 'Beginner',
      title: 'The Relational Genesis',
      subtitle: 'Garage Days · 10 Customers · 5 Home Chefs',
      topics: [
        'Entity-Relationship Diagrams (ERDs)',
        'Normalization to 1NF, 2NF, 3NF',
        'Clean CREATE TABLE statements',
        'Primary keys & Foreign key integrity',
        'Basic Cardinality (1:1 and 1:M)',
      ],
      icon: Database,
      tag: 'Round 1 · Online on Portal',
      color: 'border-primary/40',
    },
    {
      level: 'Intermediate',
      title: 'The Multi-City Expansion',
      subtitle: 'Scaling to 5,000 Customers · 3 Cities · Riders & Reviews',
      topics: [
        'Complex M:M & Self-referencing relationships',
        'Normalization up to BCNF / 4NF',
        'B-Tree & Composite Indexing strategies',
        'Complex query joins, subqueries, aggregations',
        'ACID Transactions & Stored Procedures',
      ],
      icon: TrendingUp,
      tag: 'Round 2 · Online on Portal',
      color: 'border-accent/40',
    },
    {
      level: 'Advanced',
      title: 'The Hyper-Scale Platform',
      subtitle: '1 Million Users · Ramadan Peak Load · System Defense',
      topics: [
        'Query optimization & execution plan analysis',
        'Horizontal sharding & Range/Hash partitioning',
        'NoSQL vs SQL architectural trade-offs',
        'Caching layers (Redis) & Invalidation',
        'Concurrency, Locking, CAP Theorem & Replication',
      ],
      icon: Server,
      tag: 'Round 3 · On-Campus @ UBIT',
      color: 'border-emerald-500/40',
    },
  ];

  const studentBenefits = [
    {
      title: 'Direct Industry Relevance & Production Skills',
      subtitle: 'How Tech Giants & Startups Build Systems',
      icon: Briefcase,
      desc: 'Tech companies like Careem, foodpanda, Daraz, and Amazon live and die by database performance. This module moves you beyond textbook SQL (`SELECT * FROM table`) into real production challenges: indexing strategies, transaction locking, and execution plan optimization that backend and data engineers write daily.',
      tags: ['Production Engineering', 'PostgreSQL / MySQL', 'Index Tuning'],
    },
    {
      title: 'Rigorous Knowledge Exercise Beyond Classroom Theory',
      subtitle: 'Deep Data Modeling & Relational Integrity',
      icon: GraduationCap,
      desc: 'University exams often test static schemas. Here, you experience continuous schema evolution: starting from 3NF normalization in a garage, refactoring to BCNF/4NF for riders and payments, and handling concurrent transaction race conditions without double-charging orders.',
      tags: ['3NF to BCNF/4NF', 'ACID Transactions', 'Relational Calculus'],
    },
    {
      title: 'Massive Advantage in Tech Interviews & Resumes',
      subtitle: 'Crack System Design & L4/L5 Technical Rounds',
      icon: Zap,
      desc: 'System Design and Database Architecture are the highest-weighted segments in senior software engineering interviews. Having a portfolio project where you planned sharding, solved the Ramadan Sehri spike load, and defended CAP theorem trade-offs gives you an immense competitive edge.',
      tags: ['System Design', 'Interview Portfolio', 'High-Scale Resume'],
    },
    {
      title: 'High-Scale Platform Architecture (Ramadan Rush)',
      subtitle: '1 Million Users & Zero-Downtime Peak Handling',
      icon: Cpu,
      desc: 'Tackle the authentic Pakistani traffic surge: 10,000 concurrent orders/second during Ramadan Sehri/Iftar. You will architect Redis caching layers, horizontal table partitioning, read-replicas, and determine concrete trade-offs between SQL transactions and NoSQL scalability.',
      tags: ['Horizontal Sharding', 'Redis Caching', 'CAP Theorem & HA'],
    },
    {
      title: 'Live Whiteboard Defense Before Senior Jury',
      subtitle: 'Professional Communication & Engineering Defense',
      icon: Layers,
      desc: 'On Day 3 at UBIT, finalists pitch their architecture live on stage. Defending your schema choices, handling unexpected stress tests, and answering jury edge cases sharpens your critical thinking and executive presentation skills.',
      tags: ['Live Pitching', 'Architecture Defense', 'Whiteboard Modeling'],
    },
    {
      title: 'Official Recognition & Career Networking',
      subtitle: 'Department of Computer Science (UBIT), UoK',
      icon: Award,
      desc: 'Earn prestigious accolades from one of Pakistan’s foremost computer science institutions. Connect with faculty researchers, industry jury panelists, and top peer engineers from across the country.',
      tags: ['UBIT Certification', 'Industry Jury', 'Talent Visibility'],
    },
  ];

  return (
    <section id="module" className="relative py-24 bg-[#0a0606] border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            MODULE BRIEFING // TRACK 01
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
            Introduction of the Module
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Welcome to <span className="text-foreground font-semibold">&ldquo;You Hungry? — A Karachi Startup Story&rdquo;</span>.
            Instead of abstract textbook puzzles, you are the founding database engineer for a homegrown food delivery startup.
            Across three escalating stages of business hypergrowth, your schema must survive, scale, and thrive.
          </p>
        </div>

        {/* 3 Skill Level Pillars */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {levels.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between border ${item.color} bg-card/60 p-6 sm:p-7 backdrop-blur-sm hud-cut-md hover:border-primary transition-all group`}
              >
                {/* Corner accent */}
                <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary" />

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-primary/20">
                    <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                      LEVEL 0{idx + 1} // {item.level}
                    </span>
                    <span className="border border-primary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-primary/10 hud-cut-sm">
                      {item.tag}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/10 text-primary hud-cut-sm group-hover:glow-primary transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[11px] text-accent tracking-wide">{item.subtitle}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 font-mono text-xs text-foreground/80">
                    {item.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-primary/20 pt-4 font-mono text-[10px] text-muted-foreground flex items-center justify-between">
                  <span>SCALE_PHASE // STAGE_0{idx + 1}</span>
                  <span className="text-primary font-bold">READY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHY CHOOSE THIS MODULE? Benefits, Industry Relevance & Knowledge Exercise */}
        <div className="mt-16 border border-primary/35 bg-[#120808]/90 p-6 sm:p-8 hud-cut-lg shadow-[0_0_30px_rgba(239,59,59,0.15)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-primary/25">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
                <Flame className="w-4 h-4 text-primary" />
                STUDENT VALUE PROPOSITION
              </div>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                Why Should Students Choose This Module?
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                What are the core benefits, how will it propel your career in the tech industry, and why is it the ultimate real-world knowledge exercise?
              </p>
            </div>
            <div className="font-mono text-xs text-primary border border-primary/30 px-3 py-1.5 bg-primary/10 hud-cut-sm">
              UBIT INDUSTRY PEDAGOGY
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative border border-primary/25 bg-background/50 p-5 hud-cut-sm hover:border-primary transition-all flex flex-col justify-between group"
                >
                  <span className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-primary" />
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 border border-primary/30 bg-primary/10 text-primary group-hover:glow-primary transition-all hud-cut-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase">
                          [REASON 0{idx + 1}]
                        </div>
                        <h4 className="font-display text-base font-bold uppercase text-foreground leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="font-mono text-[11px] text-accent mb-2">{item.subtitle}</div>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans">{item.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-primary/15 flex flex-wrap gap-1.5">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] border border-primary/20 bg-card/60 px-2 py-0.5 text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
