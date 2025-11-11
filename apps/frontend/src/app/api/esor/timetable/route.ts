import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get('leagueId');
  const seasonId = searchParams.get('seasonId');
  const groupId = searchParams.get('groupId');
  const roundId = searchParams.get('roundId');
  const homeTeamId = searchParams.get('homeTeamId');
  const awayTeamId = searchParams.get('awayTeamId');
  const teamId = searchParams.get('teamId');

  if (!leagueId || !seasonId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const timetable = await esorClient.getTimetable(leagueId, seasonId, {
    roundId: roundId ?? undefined,
    groupId: groupId ?? undefined,
    teamId: teamId ?? undefined,
    homeTeamId: homeTeamId ?? undefined,
    awayTeamId: awayTeamId ?? undefined,
  });

  return NextResponse.json(timetable);
}
