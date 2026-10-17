import fs from 'fs';
import path from 'path';
import { ParticipantSubmission, RoundInfo } from './types';
import { ROUNDS_DATA } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const SUBMISSIONS_LOG_FILE = path.join(DATA_DIR, 'submissions.txt');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadSubmissionsFromFile(): ParticipantSubmission[] {
  try {
    ensureDataDir();
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading submissions file:', err);
  }
  return [];
}

function saveSubmissionsToFile(submissions: ParticipantSubmission[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving submissions file:', err);
  }
}

function appendToHumanReadableLog(sub: ParticipantSubmission) {
  try {
    ensureDataDir();
    const driveOrErd = sub.erdLink || sub.presentationDeckUrl || 'None provided';
    const logEntry = `
======================================================================
NEW SUBMISSION RECEIVED: ${sub.roundId.toUpperCase()}
Timestamp: ${sub.submittedAt} (ID: ${sub.id})
Organizer Delivery: azhanadeem999@gmail.com
Team Name: ${sub.teamName}
University: ${sub.university}
Team Lead: ${sub.leadName} (${sub.leadEmail})
Google Drive / ERD Link: ${driveOrErd}
----------------------------------------------------------------------
SQL / Code Payload:
${sub.sqlCode || sub.updatedSchemaSql || 'No SQL code'}
----------------------------------------------------------------------
Notes / Documentation:
${sub.notes || sub.normalizationNotes || sub.queryNotes || 'None'}
======================================================================
`;
    fs.appendFileSync(SUBMISSIONS_LOG_FILE, logEntry, 'utf-8');
  } catch (err) {
    console.error('Error writing human-readable submission log:', err);
  }
}

let roundsStore: RoundInfo[] = [...ROUNDS_DATA];

export function getSubmissions(): ParticipantSubmission[] {
  return loadSubmissionsFromFile();
}

export function checkExistingSubmission(roundId: string, teamName: string, leadEmail: string): ParticipantSubmission | null {
  const list = loadSubmissionsFromFile();
  const normalizedTeam = teamName.trim().toLowerCase();
  const normalizedEmail = leadEmail.trim().toLowerCase();

  const found = list.find(
    (s) =>
      s.roundId === roundId &&
      (s.teamName.trim().toLowerCase() === normalizedTeam || s.leadEmail.trim().toLowerCase() === normalizedEmail)
  );
  return found || null;
}

export function addSubmission(submission: Omit<ParticipantSubmission, 'id' | 'submittedAt' | 'syncStatus' | 'webhookId'>) {
  const existing = checkExistingSubmission(submission.roundId, submission.teamName, submission.leadEmail);
  if (existing) {
    throw new Error(
      `SUBMISSION REJECTED: Team "${submission.teamName}" or email "${submission.leadEmail}" has already submitted for ${submission.roundId}. Only a single submission is allowed under Hackathon rules.`
    );
  }

  const submissions = loadSubmissionsFromFile();
  const newSubmission: ParticipantSubmission = {
    ...submission,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    syncStatus: 'synced_to_sheets',
    webhookId: `hook-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  submissions.unshift(newSubmission);
  saveSubmissionsToFile(submissions);
  appendToHumanReadableLog(newSubmission);
  return newSubmission;
}

export function getRounds(): RoundInfo[] {
  return roundsStore;
}

export function updateRoundPdf(roundId: string, pdfData: {
  filename: string;
  uploadedBy: string;
  url: string;
  size: string;
}) {
  const roundIndex = roundsStore.findIndex((r) => r.id === roundId);
  if (roundIndex !== -1) {
    roundsStore[roundIndex] = {
      ...roundsStore[roundIndex],
      judgePdf: {
        filename: pdfData.filename,
        uploadedAt: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
        uploadedBy: pdfData.uploadedBy,
        url: pdfData.url,
        size: pdfData.size,
      },
    };
    return roundsStore[roundIndex];
  }
  return null;
}
