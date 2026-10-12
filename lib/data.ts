import { RoundInfo, ScheduleDay, FaqItem } from './types';

export const ROUNDS_DATA: RoundInfo[] = [
  {
    id: 'round-1',
    number: 1,
    title: 'The Garage Days',
    level: 'Beginner',
    tagline: 'Home-Cooked Delivery in Karachi · Genesis of the Startup',
    story: 'Two friends start a small home-cooked food delivery service in Karachi. They have 10 customers and 5 partnered home-kitchen restaurants initially, operating out of a garage with manual spreadsheets.',
    task: 'Design a clean, normalized relational database covering customers, orders, menu items, and order deliveries. Implement baseline entity integrity and relational constraints.',
    skills: [
      'Entity-Relationship Diagrams (ERDs)',
      '1NF, 2NF, 3NF Normalization',
      'Core SQL CREATE TABLE Statements',
      'Primary Keys & Foreign Keys',
      '1:1 and 1:M Relationships',
    ],
    requiresCodeStorage: true,
    venueType: 'Online',
    date: '22 October 2026',
    scaleStats: {
      customers: '10 active eaters',
      restaurants: '5 home chefs',
    },
    judgePdf: {
      filename: 'CodeConnect26_Round1_TheGarageDays_Brief.pdf',
      uploadedAt: '08 Oct 2026, 14:30 PKT',
      uploadedBy: 'Lead Judge (UBIT DB Panel)',
      url: '/docs/round1_brief.pdf',
      size: '1.4 MB',
    },
  },
  {
    id: 'round-2',
    number: 2,
    title: 'The Expansion',
    level: 'Intermediate',
    tagline: 'Cross-City Scale · Riders, Ratings & Multi-Channel Payments',
    story: 'The startup explodes in popularity, scaling to 5,000 customers across 3 major cities. Operations now involve hundreds of independent restaurants, real-time dispatch riders, customer rating reviews, and multiple payment gateways (Cash, JazzCash, EasyPaisa, Cards).',
    task: 'Upgrade the database architecture to support many-to-many relationships, dynamic rider assignments, complex billing transactions, and query speedups through composite indexing.',
    skills: [
      'Complex M:M & Self-referencing Relationships',
      'Normalization to BCNF / 4NF',
      'Targeted Indexing & Execution Plans',
      'Complex Query Writing (Joins, Aggregations, Subqueries)',
      'ACID Transactions & Stored Procedures / Views',
    ],
    requiresCodeStorage: true,
    venueType: 'Online',
    date: '23 October 2026',
    scaleStats: {
      customers: '5,000 customers',
      restaurants: '3 cities / 120 hubs',
      riders: '350 active riders',
    },
    judgePdf: {
      filename: 'CodeConnect26_Round2_TheExpansion_Rubric.pdf',
      uploadedAt: '08 Oct 2026, 19:15 PKT',
      uploadedBy: 'Lead Judge (UBIT DB Panel)',
      url: '/docs/round2_rubric.pdf',
      size: '2.1 MB',
    },
  },
  {
    id: 'round-3',
    number: 3,
    title: 'The Platform',
    level: 'Advanced',
    tagline: 'Peak Ramadan / Eid Rush · 1M Users & Hyper-Scale Architecture',
    story: 'The startup is now Karachi’s premier food delivery platform, serving 1,000,000 users with 500 top-tier restaurants and 2,000 delivery riders. The database must survive extreme concurrent spike loads during Ramadan Sehri/Iftar and Eid night rushes without downtime.',
    task: 'Architect a resilient high-throughput infrastructure. Plan partitioning, read/write sharding, caching tiers (Redis/Memcached), evaluate SQL vs NoSQL trade-offs, and defend concurrency and disaster-recovery trade-offs live on campus.',
    skills: [
      'Horizontal Sharding & Read-Replicas',
      'Table Partitioning & Cold/Warm Tiering',
      'NoSQL vs SQL Hybrid Architecture Decisions',
      'Caching & Invalidation Strategies',
      'Concurrency Control, Pessimistic/Optimistic Locking',
      'CAP Theorem Trade-Offs & Live Defense Pitch',
    ],
    requiresCodeStorage: false, // Day 3 on-campus: no code storage needed, live presentation/defense
    venueType: 'On-Campus',
    date: '24 October 2026',
    scaleStats: {
      customers: '1,000,000+ users',
      restaurants: '500+ commercial partners',
      riders: '2,000 full-fleet riders',
    },
    judgePdf: {
      filename: 'CodeConnect26_Round3_ThePlatform_Defense_Rubric.pdf',
      uploadedAt: '09 Oct 2026, 06:00 PKT',
      uploadedBy: 'Head of Jury (UBIT UoK)',
      url: '/docs/round3_defense.pdf',
      size: '2.8 MB',
    },
  },
];

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    dayNumber: 1,
    date: 'Thursday, 22 October 2026',
    title: 'Day 01 · Genesis & Core Relational Modeling',
    mode: 'Online',
    venue: 'Participants will submit their work online on the portal.',
    roundAssociated: 'Round 1: The Garage Days',
    highlights: [
      'The venue: participants will submit their work online on the portal.',
      'Problem statement PDF released by Judges',
      'Participant portal opens for Round 1 SQL script & ERD diagram uploads',
      'Code & schema submissions captured into secure database storage',
      'Metadata synced automatically via n8n to Google Sheets for jury monitoring',
    ],
    agenda: [
      { time: '09:00 AM', activity: 'Online Opening Ceremony & Live Briefing' },
      { time: '10:00 AM', activity: 'Round 1 Problem Release (Judges upload PDF)' },
      { time: '10:30 AM - 08:00 PM', activity: 'Relational Design & SQL Sprint (Online Submission Window)' },
      { time: '09:00 PM', activity: 'Round 1 Submission Hard Cutoff' },
    ],
  },
  {
    dayNumber: 2,
    date: 'Friday, 23 October 2026',
    title: 'Day 02 · Complex Transactions & Multi-City Expansion',
    mode: 'Online',
    venue: 'Participants will submit their work online on the portal.',
    roundAssociated: 'Round 2: The Expansion',
    highlights: [
      'The venue: participants will submit their work online on the portal.',
      'Round 2 PDF prompt released exclusively by Judges',
      'M:M schemas, indexing, rider dispatch triggers and stored procedures evaluated',
      'Code submissions stored in dedicated database; metadata sent to Google Sheets',
      'Announcement of Top Finalist Teams advancing to Day 3 On-Campus',
    ],
    agenda: [
      { time: '09:30 AM', activity: 'Round 2 Briefing & Expansion Challenge Drops' },
      { time: '10:00 AM - 07:00 PM', activity: 'Complex Querying & Transaction Optimization Sprint' },
      { time: '08:00 PM', activity: 'Round 2 Submissions Close' },
      { time: '10:00 PM', activity: 'Judge Panel Publishes Day 3 Finalist Shortlist' },
    ],
  },
  {
    dayNumber: 3,
    date: 'Saturday, 24 October 2026',
    title: 'Day 03 · The Grand Finale & Architecture Defense',
    mode: 'On-Campus',
    venue: 'Department of Computer Science (UBIT), University of Karachi',
    roundAssociated: 'Round 3: The Platform',
    highlights: [
      'In-person battle at UBIT Computer Labs & Auditorium',
      'No code database storage required — live architectural presentation and whiteboard defense',
      'Judges evaluate live stress-test questions (Ramadan peak surge, sharding keys, CAP theorem)',
      'Closing Ceremony, Trophies & Prize Distribution',
    ],
    agenda: [
      { time: '09:00 AM', activity: 'On-Campus Check-In & UBIT Lab Setup (BYOD)' },
      { time: '10:00 AM', activity: 'Round 3 Live Challenge Unveiling' },
      { time: '10:30 AM - 02:00 PM', activity: 'Platform Architecture & High-Scale Defense Prep' },
      { time: '02:30 PM - 05:00 PM', activity: 'Live Pitch to Judge Panel (Auditorium)' },
      { time: '05:30 PM', activity: 'Closing Keynote, Results & Awards Ceremony' },
    ],
  },
];

export const RULES_LIST = [
  {
    title: 'BYOD: Bring Your Own Device',
    description: 'Every participant must bring their own laptop with a fully charged battery (100%). Power strips are provided on Day 3, but battery backup is essential.',
    badge: 'Hardware Rule',
  },
  {
    title: 'Internet Readiness: Zong or Jazz Recommended',
    description: 'Ensure you have an active 4G mobile data bundle (Zong or Jazz packages strongly advised) to guarantee uninterrupted connectivity during online submissions and on-campus backups.',
    badge: 'Connectivity',
  },
  {
    title: 'Team Composition & Eligibility',
    description: 'Teams can consist of 1 to 4 members. Open to undergraduate and graduate students from any recognized university across Pakistan.',
    badge: 'Eligibility',
  },
  {
    title: 'Submission Policies for Rounds 1 & 2',
    description: 'For Rounds 1 & 2 (Online), teams must submit complete SQL scripts and ERD diagrams through this portal before the deadline. Strict single submission policy applies.',
    badge: 'Online Rounds',
  },
  {
    title: 'On-Campus Defense for Round 3',
    description: 'Round 3 takes place physically at UBIT, University of Karachi. No code repository database upload is needed for this round; teams will present and defend their system design and sharding blueprint live before the judges.',
    badge: 'Day 3 Finals',
  },
  {
    title: 'Zero Plagiarism & AI Usage Policy',
    description: 'AI assistants can be used for syntax debugging, but entire copy-paste schema generation without conceptual defense will result in immediate disqualification by the jury.',
    badge: 'Fair Play',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    category: 'General',
    question: 'Will forms be given to all participants?',
    answer: 'Yes.',
  },
  {
    category: 'General',
    question: 'What is the winning prize?',
    answer: 'Will be announced, InShaAllah. Register yourself to find out.',
  },
  {
    category: 'General',
    question: 'What is CodeConnect 2026 "You Hungry?" challenge?',
    answer: 'It is a premier 3-round Database Design Challenge organized by the Department of Computer Science (UBIT), University of Karachi. Teams step into the shoes of database architects for a Karachi food delivery startup as it grows from a garage operation (10 orders) to a mega-platform (1M users during Ramadan).',
  },
  {
    category: 'Submissions & Code',
    question: 'Why is code database storage required for Rounds 1 and 2, but not Round 3?',
    answer: 'Rounds 1 and 2 are held entirely online on the portal. Therefore, participant SQL scripts, DDL statements, and ERD files must be stored safely in the hackathon submission database for asynchronous jury review. In contrast, Round 3 is held on-campus at UBIT, where teams present their architectural diagrams and defend their sharding decisions live to the judges.',
  },
  {
    category: 'Judging',
    question: 'Who can upload PDFs in the rounds description section?',
    answer: 'Only verified Judges have permission to upload PDF problem briefs, rubric sheets, and milestone guides. Once a judge uploads a PDF for any round, participants can instantly view and download it.',
  },
  {
    category: 'On-Campus',
    question: 'What are the on-campus requirements for Day 3 at UBIT?',
    answer: 'Participants must follow the BYOD policy: bring your own laptop with battery charged to 100%, university student ID card, and a mobile hotspot package (Zong or Jazz recommended).',
  },
  {
    category: 'General',
    question: 'What is the registration deadline?',
    answer: 'The registration deadline is 18 October 2026. Register via the official Google Form QR code or link.',
  },
];
