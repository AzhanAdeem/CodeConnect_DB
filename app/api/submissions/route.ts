import { NextResponse } from 'next/server';
import { addSubmission, getSubmissions, checkExistingSubmission } from '@/lib/storage';

export async function GET() {
  const list = getSubmissions();
  return NextResponse.json({
    success: true,
    count: list.length,
    storageLocation: 'data/submissions.json',
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
            error: 'Round 1 requires both the ERD public diagram link and the normalized SQL DDL schema.',
          },
          { status: 400 }
        );
      }
    } else if (roundId === 'round-2') {
      if (!sqlCode && (!updatedSchemaSql || !transactionsSql)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Round 2 requires updated M:M schema SQL, indexing strategy, and ACID transaction blocks.',
          },
          { status: 400 }
        );
      }
    } else if (roundId === 'round-3') {
      if (!presentationDeckUrl || !scalingArchitectureSummary) {
        return NextResponse.json(
          {
            success: false,
            error: 'Round 3 requires the presentation slide deck URL and high-scale architecture summary.',
          },
          { status: 400 }
        );
      }
    }

    // 1. Commit submission (including complete SQL statements) into persistent disk/database storage
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

    // 2. Prepare metadata-only payload for Google Sheets via Apps Script / n8n
    // Note: SQL code is kept in the server database (data/submissions.json) to keep sheets fast & lightweight
    const sheetsMetadataPayload = {
      event: 'HACKATHON_SUBMISSION_RECORDED',
      timestamp: saved.submittedAt,
      googleSheetsRow: {
        timestamp: saved.submittedAt,
        roundId: saved.roundId,
        teamName: saved.teamName,
        teamLead: saved.leadName,
        email: saved.leadEmail,
        university: saved.university,
        erdLinkProvided: Boolean(saved.erdLink || saved.presentationDeckUrl),
        sqlStoredInDatabase: Boolean(saved.sqlCode),
        sqlLinesCount: saved.sqlCode ? saved.sqlCode.split('\n').length : 0,
        submissionId: saved.id,
      },
    };

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    let n8nDispatched = false;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsMetadataPayload),
        });
        n8nDispatched = true;
      } catch (err) {
        console.warn('Webhook dispatch skipped:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Round ${roundId.replace('round-', '')} submission successfully locked and stored in the database.`,
      submissionId: saved.id,
      storageLocation: 'data/submissions.json',
      metadataDispatched: sheetsMetadataPayload,
      n8nDispatched,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing submission' },
      { status: 500 }
    );
  }
}
