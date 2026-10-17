import { NextResponse } from 'next/server';
import { addSubmission, getSubmissions, checkExistingSubmission } from '@/lib/storage';

const ORGANIZER_EMAIL = 'azhanadeem999@gmail.com';

export async function GET() {
  const list = getSubmissions();
  return NextResponse.json({
    success: true,
    count: list.length,
    storageLocation: 'data/submissions.json',
    readableLog: 'data/submissions.txt',
    organizerEmail: ORGANIZER_EMAIL,
    submissions: list,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      roundId,
      teamName,
      leadEmail,
      leadName,
      university,
      sqlCode,
      erdLink,
      normalizationNotes,
      updatedSchemaSql,
      indexingStrategySql,
      transactionsSql,
      queryNotes,
      presentationDeckUrl,
      scalingArchitectureSummary,
      concurrencyPlan,
      presenterNames,
      notes,
    } = body;

    if (!roundId || !teamName || !leadEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory fields: roundId, teamName, or leadEmail' },
        { status: 400 }
      );
    }

    // STRICT SINGLE SUBMISSION CHECK
    const existing = checkExistingSubmission(roundId, teamName, leadEmail);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `SINGLE SUBMISSION RULE: Team "${teamName}" (${leadEmail}) has already submitted for ${roundId}. Duplicate submissions are strictly prohibited under hackathon rules. Record ID: ${existing.id}`,
          alreadySubmitted: true,
          existingSubmissionId: existing.id,
        },
        { status: 409 }
      );
    }

    // Round-specific validation
    if (roundId === 'round-1') {
      if (!sqlCode || !erdLink) {
        return NextResponse.json(
          {
            success: false,
            error: 'Round 1 requires both the Google Drive / ERD diagram link and the normalized SQL DDL schema.',
          },
          { status: 400 }
        );
      }
    } else if (roundId === 'round-2') {
      if (!sqlCode && (!updatedSchemaSql || !transactionsSql)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Round 2 requires Google Drive link, updated schema SQL, indexing strategy, and transaction blocks.',
          },
          { status: 400 }
        );
      }
    }

    // 1. Commit submission into persistent storage (data/submissions.json and data/submissions.txt)
    const saved = addSubmission({
      roundId,
      teamName,
      leadEmail,
      leadName: leadName || 'Team Lead',
      university: university || 'Recognized University',
      sqlCode: sqlCode || '',
      erdLink: erdLink || '',
      normalizationNotes: normalizationNotes || '',
      updatedSchemaSql: updatedSchemaSql || '',
      indexingStrategySql: indexingStrategySql || '',
      transactionsSql: transactionsSql || '',
      queryNotes: queryNotes || '',
      presentationDeckUrl: presentationDeckUrl || '',
      scalingArchitectureSummary: scalingArchitectureSummary || '',
      concurrencyPlan: concurrencyPlan || '',
      presenterNames: presenterNames || '',
      notes: notes || '',
    });

    // 2. Dispatch email notification directly to azhanadeem999@gmail.com via FormSubmit
    const driveLink = erdLink || presentationDeckUrl || 'None provided';
    let emailDispatched = false;
    try {
      const emailPayload = {
        _subject: `[CodeConnect 2026] New ${roundId.toUpperCase()} Submission: ${teamName}`,
        submissionId: saved.id,
        round: roundId,
        teamName: teamName,
        university: university,
        teamLead: `${leadName} (${leadEmail})`,
        googleDriveLink: driveLink,
        submittedAt: saved.submittedAt,
        sqlLinesCount: saved.sqlCode ? saved.sqlCode.split('\n').length : 0,
        notes: notes || normalizationNotes || queryNotes || 'None',
      };

      const mailRes = await fetch(`https://formsubmit.co/ajax/${ORGANIZER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
      if (mailRes.ok) {
        emailDispatched = true;
      }
    } catch (mailErr) {
      console.warn('FormSubmit dispatch error:', mailErr);
    }

    // 3. Construct direct mailto fallback link for the participant
    const mailtoSubject = encodeURIComponent(
      `[CodeConnect 2026] ${roundId.toUpperCase()} Submission Confirmation: ${teamName}`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Azha Nadeem,\n\nHere is our submission for CodeConnect 2026 Database Design Challenge:\n\n` +
        `• Round: ${roundId}\n` +
        `• Team Name: ${teamName}\n` +
        `• University: ${university}\n` +
        `• Team Lead: ${leadName} (${leadEmail})\n` +
        `• Google Drive / ERD Link: ${driveLink}\n` +
        `• Submission ID: ${saved.id}\n` +
        `• Timestamp: ${saved.submittedAt}\n\n` +
        `SQL Schema / Solution:\n${saved.sqlCode || ''}\n\n` +
        `Best regards,\n${leadName}`
    );
    const directMailtoUrl = `mailto:${ORGANIZER_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      message: `Round ${roundId.replace('round-', '')} submission successfully recorded and directed to ${ORGANIZER_EMAIL}.`,
      submissionId: saved.id,
      organizerEmail: ORGANIZER_EMAIL,
      driveLink: driveLink,
      directMailtoUrl: directMailtoUrl,
      emailDispatched,
      storageLocation: 'data/submissions.json',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing submission' },
      { status: 500 }
    );
  }
}
