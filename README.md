# CodeConnect 2026 — "You Hungry? A Karachi Startup Story"
### Department of Computer Science (UBIT), University of Karachi
**A 3-Round Database Design & Architecture Challenge | 22 — 24 October 2026**

---

## 🚀 Live Demo & Local Access
- **Local URL**: [http://localhost:3000](http://localhost:3000)
- **Project Directory**: `C:\Users\Dell\.gemini\antigravity\scratch\codeconnect26-hackathon`
> *Recommendation*: Set `C:\Users\Dell\.gemini\antigravity\scratch\codeconnect26-hackathon` as your active workspace in Antigravity.

---

## 🎨 Design & Style
Faithfully styled after [codeconnect26.vercel.app](https://codeconnect26.vercel.app/):
- **Cyberpunk HUD Aesthetics**: Deep dark carbon palette (`#080505`), neon red/crimson accents (`#ef3b3b`), subtle scanlines, animated tech grid, and glowing telemetry borders.
- **HUD Polygon Accents**: Clipped-corner polygon buttons & cards (`clip-path: polygon(...)`).
- **Interactive Terminal HUD**: Live simulated code rain with database DDL, indexes, and sharding algorithms.
- **Live Countdown Timer**: Styled telemetry timer counting down to 22 October 2026.
- **Infinite Marquee Ticker**: Continuous neon scrolling banner with hackathon slogans.

---

## 🔄 Web Flow Architecture
```
[Participant] / [Judge]
       │
       ▼
[Next.js 14 on Vercel]
       │
       ▼
[NextAuth.js] (Google & GitHub OAuth + Fast Demo Switcher)
       │
 ┌─────┴────────────────────────────────────────────────┐
 │                                                      │
 ▼                                                      ▼
[Rounds 1 & 2: Online]                         [Round 3: On-Campus]
Store SQL DDL & Schemas                         Live Whiteboard & Deck Defense
in Database Storage                             (No Code DB Storage Needed)
 │                                                      │
 └──────────────────────┬───────────────────────────────┘
                        │
                        ▼
           [Next.js API Routes] (/api/submissions)
                        │
                        ▼ (Metadata ONLY)
           [n8n Webhook Trigger]
                        │
                        ▼
      [Google Sheets via Apps Script API]
         (Jury Monitoring Spreadsheet)
```

### Key Architectural Rules
1. **Metadata-Only in Google Sheets**: Participant names, emails, round IDs, and code line metrics are forwarded via the Apps Script API to keep Google Sheets fast and secure.
2. **Code Database Storage for Online Rounds (Rounds 1 & 2)**: Full SQL code, normalization files, and ERD URLs are committed into the Hackathon SQL database for asynchronous jury review.
3. **Round 3 On-Campus (Day 3)**: Held in-person at UBIT, University of Karachi. No code repository database upload is needed; teams pitch and defend their high-scale sharding architecture live.

---

## 👥 Dual-Role UX (Participant vs Judge)
- **Top Bar Role Switcher**: Click the **PARTICIPANT UX / JUDGE UX** toggle in the navbar to test both perspectives instantly.
- **Judge UX Privilege**:
  - Exclusive access to **"UPLOAD ROUND PDF BRIEF / RUBRIC"** on each of the 3 round cards.
  - Can publish and overwrite official problem statement PDFs.
  - Non-judges attempting to upload receive a strict `403 Forbidden` response.
- **Participant UX**:
  - View published round problem statement PDFs with one-click download.
  - Submit SQL scripts and ERD links for Rounds 1 & 2.
  - Register for the Round 3 on-campus defense slot.
  - Live visual feedback confirming database storage and Google Sheets sync.

---

## 📑 Front Page Sections
1. **Header & Navigation**: Brand logo, anchor navigation, role toggle, and Web Flow modal button.
2. **Hero Section**: UBIT branding, "You Hungry?" tagline, tech badges, terminal HUD, and cyber countdown.
3. **Marquee Ticker**: Infinite animated neon red ticker.
4. **Section 1: Introduction of the Module**:
   - The 3 difficulty levels (Beginner, Intermediate, Advanced).
   - The scaling saga: 10 customers -> 5,000 customers in 3 cities -> 1,000,000 users.
   - **"Why Food Delivery Startup?"** 5 foundational reasons (relatable, difficulty escalation, builds on previous rounds, real-world skills, easy to judge).
5. **Section 2: Hackathon Schedule**:
   - 3-day timeline: Day 1 (Online - Oct 22), Day 2 (Online - Oct 23), Day 3 (On-Campus @ UBIT - Oct 24).
   - Interactive tabbed agendas and milestones.
6. **Section 3: Rules & Participant Requirements**:
   - **BYOD**: Bring Your Own Device.
   - **100% Battery**: Laptops must arrive fully charged.
   - **Internet Package**: Zong or Jazz 4G packages recommended.
   - Team limits (up to 4 members), eligibility across Pakistan, and plagiarism rules.
7. **Section 4: Rounds Description & Problem Sets**:
   - Detailed stories, engineering tasks, tested competencies, and scale metrics for Rounds 1, 2, and 3.
   - **PDF upload option exclusively for Judges**.
   - Download problem brief for participants.
   - Interactive submission modals.
8. **Section 5: FAQs**:
   - Filterable accordion answers covering general rules, code storage, judging, and on-campus logistics.
9. **Section 6: Socials & Contact**:
   - WhatsApp helpline: `+92 345 8126462`.
   - Scan-to-register QR code element.
   - Registration deadline: **18 October 2026**.
   - UBIT, University of Karachi footer credits.

---

## ⚙️ Environment Variables (`.env.local`)
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=codeconnect-secret-token-2026

# OAuth Providers
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional n8n & Google Apps Script Webhooks
N8N_WEBHOOK_URL=https://n8n.your-domain.com/webhook/codeconnect-submissions
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfyc.../exec
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, PostCSS, Lucide React, Canvas Confetti
- **Auth**: NextAuth.js (Google, GitHub, Role-based demo switcher)
- **Deployment Ready**: Vercel Serverless
