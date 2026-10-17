import { NextResponse } from 'next/server';

const JUDGE_PASSWORD = 'rudolph-insists-demanded-citation-convent-pairing-aztec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ success: false, error: 'Password is required' }, { status: 400 });
    }

    if (password.trim() === JUDGE_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Judge authenticated successfully',
        role: 'judge',
        token: Buffer.from(`judge:${Date.now()}:${JUDGE_PASSWORD}`).toString('base64'),
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid Judge Password. Access denied.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
