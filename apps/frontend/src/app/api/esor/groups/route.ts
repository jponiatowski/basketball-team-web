import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get('leagueId');
  const roundId = searchParams.get('roundId');

  if (!leagueId) {
    return NextResponse.json({ error: 'Missing leagueId' }, { status: 400 });
  }

  if (!roundId) {
    return NextResponse.json({ error: 'Missing roundId' }, { status: 400 });
  }

  const season = await esorClient.getCurrentSeason();

  const groups = await esorClient.getGroups(leagueId, season.id, roundId);

  return NextResponse.json(groups);
}
