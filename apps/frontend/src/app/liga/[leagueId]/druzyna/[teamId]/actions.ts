import { esorClient } from '@/base/lib/esor/client';

export const getTeamPageData = async (leagueId: string, teamId: string) => {
  const season = await esorClient.getCurrentSeason();
  const [team, league, players] = await Promise.all([
    esorClient.getTeam(teamId, { seasonId: season.id, leagueId }),
    esorClient.getLeague(leagueId),
    esorClient.getTeamPlayers(teamId, { seasonId: season.id }),
  ]);

  return { team, league, players };
};
