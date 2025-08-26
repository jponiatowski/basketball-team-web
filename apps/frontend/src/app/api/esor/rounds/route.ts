import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get('leagueId');
  const seasonId = searchParams.get('seasonId');

  if (!leagueId || !seasonId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const rounds = await esorClient.getRounds(leagueId, seasonId);

  return NextResponse.json(rounds);
}
