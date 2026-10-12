import { NextResponse } from 'next/server';
import { getRounds } from '@/lib/storage';

export async function GET() {
  const rounds = getRounds();
  return NextResponse.json({ success: true, rounds });
}
