import { NextResponse } from 'next/server';
import { updateRoundPdf, getRounds } from '@/lib/storage';

const JUDGE_PASSWORD = 'rudolph-insists-demanded-citation-convent-pairing-aztec';

export async function GET() {
  return NextResponse.json({ rounds: getRounds() });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-judge-auth') || '';
    const body = await request.json();
    const { roundId, filename, uploadedBy, url, size, password } = body;

    const providedKey = password || authHeader;

    // Check if the provided key matches or decodes to the judge password
    const isAuthorized =
      providedKey === JUDGE_PASSWORD ||
      (providedKey && Buffer.from(providedKey, 'base64').toString('utf-8').includes(JUDGE_PASSWORD));

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'ACCESS DENIED: Valid Judge credentials are required to upload or update round PDFs.',
        },
        { status: 403 }
      );
    }

    if (!roundId || !filename) {
      return NextResponse.json(
        { success: false, error: 'roundId and filename are required' },
        { status: 400 }
      );
    }

    const updated = updateRoundPdf(roundId, {
      filename,
      uploadedBy: uploadedBy || 'Jury Panel (UBIT)',
      url: url || `/docs/${filename}`,
      size: size || '1.8 MB',
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Round not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Round ${updated.number} PDF successfully published to participants.`,
      round: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload PDF' },
      { status: 500 }
    );
  }
}
