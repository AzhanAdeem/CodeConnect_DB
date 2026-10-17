import { RoundInfo, ScheduleDay, FaqItem } from './types';

export const ROUNDS_DATA: RoundInfo[] = [
  {
    id: 'round-1',
    number: 1,
    title: 'Round 1: Initial Design Submission',
    level: 'Beginner',
    tagline: 'PART A: THE GARAGE DAYS · 10 Customers · 5 Dishes · 1 Rider',
    story: 'Two friends start a home-cooked food delivery service in Karachi called "You Hungry." • 10 regular customers • 5 dishes on the menu • 1 rider (Ali on his motorbikes) • Orders taken via WhatsApp • They need a simple database.',
    task: 'Design a clean, normalized relational database covering customers, dishes/menu items, orders, and rider delivery. Implement baseline entity integrity, normalization (2NF, 3NF), and core SQL queries.',
    skills: [
      'ER Diagrams',
      'Normalization (2NF, 3NF)',
      '1:1, 1:M, M:M Relations',
      'SQL Basics: JOIN, GROUP BY, AVG, ORDER BY, LIMIT, HAVING, COUNT, WHERE',
      'Indexing',
    ],
    requiresCodeStorage: true,
    venueType: 'Online',
    date: 'Saturday, 17th Oct · 9:00 AM - 12:00 PM (3 Hours)',
    scaleStats: {
      customers: '10 regular customers',
      restaurants: '5 dishes on menu',
      riders: '1 rider (Ali on his motorbikes)',
    },
    judgePdf: {
      filename: 'CodeConnect26_Round1_TheGarageDays_Brief.pdf',
      uploadedAt: '17 Oct 2026, 09:00 PKT',
      uploadedBy: 'Lead Judge (UBIT DB Panel)',
      url: '/docs/round1_brief.pdf',
      size: '1.4 MB',
    },
  },
  {
    id: 'round-2',
    number: 2,
    title: 'Round 2: Optimization & Queries',
    level: 'Intermediate',
    tagline: 'PART B: THE EXPANSION & THE PLATFORM · 1 Million Users · Ramadan Spike',
    story: 'You Hungry is now a hit! • 5,000 customers • 50 restaurants • 200 riders • 3 cities • Ratings, payments, promo codes. Their old database is crashing. Fix it! Round 2 is 3 hours (180 minutes) and follows the story of "The Platform" — the startup has grown to 1 million users, 500 restaurants, 2,000 riders, 50,000 orders/day, expanding to 5 cities, with Ramadan/Eid traffic spikes of 10x.',
    task: 'Optimize and scale the database architecture. Implement BCNF/4NF, subqueries, views, stored procedures, ACID transactions with locking, query optimization with EXPLAIN, partitioning, sharding, and NoSQL vs SQL trade-offs.',
    skills: [
      'BCNF / 4NF Normalization',
      'Subqueries, Views & Stored Procedures',
      'Transactions (Concurrency & Locking)',
      'Query Optimization (EXPLAIN, rewrite slow queries)',
      'Partitioning & Sharding',
      'NoSQL vs SQL Decisions & Denormalization',
      'Database Security & OLTP vs OLAP (Star Schema)',
      'CAP Theorem & Replication',
    ],
    requiresCodeStorage: true,
    venueType: 'Online',
    date: 'Sunday, 18th Oct · 9:00 AM - 12:00 PM (3 Hours)',
    scaleStats: {
      customers: '1,000,000 users (50,000 orders/day)',
      restaurants: '500 restaurants (5 cities)',
      riders: '2,000 riders (10x Ramadan spikes)',
    },
    judgePdf: {
      filename: 'CodeConnect26_Round2_Expansion_ThePlatform_Rubric.pdf',
      uploadedAt: '17 Oct 2026, 09:15 PKT',
      uploadedBy: 'Lead Judge (UBIT DB Panel)',
      url: '/docs/round2_rubric.pdf',
      size: '2.1 MB',
    },
  },
];

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    dayNumber: 1,
    date: 'Saturday, 17th Oct',
    title: 'Day 01 · Round 1: Initial Design Submission',
    mode: 'Online',
    venue: 'Participants will submit their work online on the portal.',
    roundAssociated: 'Round 1: Initial Design Submission (The Garage Days)',
    highlights: [
      'Venue: Participants will submit their work online on the portal.',
      'Start: 17th Oct, Saturday - 9:00 AM | End: 17th Oct, Saturday - 12:00 PM',
      'Total Working Time: 3 Hours (180 minutes)',
      'Topics: ER Diagrams, Normalization (2NF, 3NF), 1:1, 1:M, M:M, SQL Basics (JOIN, GROUP BY, WHERE), Indexing',
      'Submission: SQL schema scripts and ERD drive links submitted directly on this portal.',
    ],
    agenda: [
      { time: '09:00 AM', activity: 'Round 1 Starts: Initial Design Submission Challenge Released' },
      { time: '09:00 AM - 12:00 PM', activity: 'Active Working Window: ERDs, 3NF Normalization & SQL DDL (3 Hours)' },
      { time: '12:00 PM', activity: 'Round 1 Hard Cutoff: Submissions Close on Portal' },
    ],
  },
  {
    dayNumber: 2,
    date: 'Sunday, 18th Oct',
    title: 'Day 02 · Round 2: Optimization & Queries',
    mode: 'Online',
    venue: 'Participants will submit their work online on the portal.',
    roundAssociated: 'Round 2: Optimization & Queries (The Expansion & The Platform)',
    highlights: [
      'Venue: Participants will submit their work online on the portal.',
      'Start: 18th Oct, Sunday - 9:00 AM | End: 18th Oct, Sunday - 12:00 PM',
      'Total Working Time: 3 Hours (180 minutes)',
      'Topics: BCNF/4NF, Subqueries, Stored Procedures, Concurrency, Sharding, EXPLAIN, NoSQL vs SQL',
      'Scaling challenge: 1M users, 50,000 orders/day, and 10x Ramadan traffic spikes.',
    ],
    agenda: [
      { time: '09:00 AM', activity: 'Round 2 Starts: Optimization & Queries Challenge Drops' },
      { time: '09:00 AM - 12:00 PM', activity: 'Active Working Window: Query Optimization, Indexing & Transactions (3 Hours)' },
      { time: '12:00 PM', activity: 'Round 2 Hard Cutoff: Submissions Close on Portal' },
    ],
  },
];

export const RULES_LIST = [
  {
    title: 'Strict Working Time Limit',
    description: 'Total Working Time for Round 1 & Round 2 is strictly 3 Hours each (9:00 AM to 12:00 PM). Submissions portal locks precisely at 12:00 PM.',
    badge: 'Time Limit',
  },
  {
    title: 'Single Submission Policy',
    description: 'Only ONE (1) submission per team is allowed for each round. Ensure all drive links, SQL scripts, and documentation are verified before submission.',
    badge: 'Submission Rule',
  },
  {
    title: 'Direct Organizer Delivery',
    description: 'All participant submissions and Google Drive links are automatically recorded and directed to the organizing committee (azhanadeem999@gmail.com).',
    badge: 'Verification',
  },
  {
    title: 'BYOD: Bring Your Own Device',
    description: 'Every participant must have their laptop charged to 100% and backup internet ready (Zong or Jazz 4G packages recommended).',
    badge: 'Hardware Rule',
  },
  {
    title: 'Team Composition & Eligibility',
    description: 'Teams can consist of 1 to 4 members. Open to undergraduate and graduate students from any recognized university across Pakistan.',
    badge: 'Eligibility',
  },
  {
    title: 'Zero Plagiarism Policy',
    description: 'All schema designs, queries, and optimizations must be original. Copy-pasted schemas without individual defense will result in immediate disqualification.',
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
    question: 'What are the updated dates and working hours?',
    answer: 'Round 1 (Initial Design Submission): Saturday 17th Oct, 9:00 AM – 12:00 PM (3 Hours). Round 2 (Optimization & Queries): Sunday 18th Oct, 9:00 AM – 12:00 PM (3 Hours). Venue: Online on this portal. Final Round 3 (Pitch & Presentation) takes place on 22nd Oct, 9:00 AM – 11:00 AM.',
  },
  {
    category: 'Submissions & Code',
    question: 'How do I submit my Google Drive links and SQL code?',
    answer: 'Click "SUBMIT ROUND 01" or "SUBMIT ROUND 02" on the portal. Enter your team details, paste your Google Drive link or ERD diagram URL, and add your SQL code. All submissions are automatically recorded in the database and directed to azhanadeem999@gmail.com.',
  },
  {
    category: 'Judging',
    question: 'Who has access to the Judge UI?',
    answer: 'Judge access is strictly restricted to authorized evaluators via password authentication.',
  },
  {
    category: 'Submissions & Code',
    question: 'Can I submit multiple times?',
    answer: 'No. There is a strict single submission policy. Only 1 submission per team is permitted for each round.',
  },
];
