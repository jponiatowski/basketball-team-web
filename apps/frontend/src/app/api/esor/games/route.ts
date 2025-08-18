import { esorClient } from '@/base/lib/esor/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get('leagueId') ?? undefined;
  const roundId = searchParams.get('roundId') ?? undefined;
  const groupId = searchParams.get('groupId') ?? undefined;
  const homeTeamId = searchParams.get('homeTeamId') ?? undefined;
  const awayTeamId = searchParams.get('awayTeamId') ?? undefined;

  if (!leagueId || !roundId || !homeTeamId || !awayTeamId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const season = await esorClient.getCurrentSeason();

  const game = await esorClient.getTimetable(leagueId, season.id, {
    roundId,
    groupId,
    homeTeamId,
    awayTeamId,
  });

  return NextResponse.json({
    awayTeamName: game[0].awayTeam.name,
    homeTeamName: game[0].homeTeam.name,
    finalScore: game[0].finalScore,
  });
}
