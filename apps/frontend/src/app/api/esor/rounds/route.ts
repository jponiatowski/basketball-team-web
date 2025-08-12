import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get('leagueId');

  if (!leagueId) {
    return NextResponse.json({ error: 'Missing leagueId' }, { status: 400 });
  }

  const season = await esorClient.getCurrentSeason();

  const rounds = await esorClient.getRounds(leagueId, '27');
  console.log(rounds);
  return NextResponse.json(rounds);
}
