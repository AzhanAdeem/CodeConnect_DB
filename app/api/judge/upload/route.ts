import { NextResponse } from 'next/server';
import { updateRoundPdf, getRounds } from '@/lib/storage';

export async function GET() {
  return NextResponse.json({ rounds: getRounds() });
}

export async function POST(request: Request) {
  try {
    const roleHeader = request.headers.get('x-user-role');
    const body = await request.json();
    const { roundId, filename, uploadedBy, url, size, role } = body;

    const userRole = role || roleHeader;

    if (userRole !== 'judge') {
      return NextResponse.json(
        {
          success: false,
          error: 'ACCESS DENIED: Only verified Judges are authorized to upload round PDF problem statements and rubrics.',
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
      message: `Round ${updated.number} PDF successfully uploaded and published to participants.`,
      round: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload PDF' },
      { status: 500 }
    );
  }
}
