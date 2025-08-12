import { esorClient } from '@/base/lib/esor/client';
import { Heading } from '@radix-ui/themes';

export default async function TablePage({
  params,
}: {
  params: Promise<{ leagueId: string; teamId: string }>;
}) {
  const { leagueId, teamId } = await params;
  const league = await esorClient.getLeague(leagueId);
  const team = await esorClient.getTeam(teamId);
  const table = await esorClient.getLeagueTable(leagueId, '27');
  return (
    <div>
      <Heading as="h1" size="8">
        {league.name} - Tabela
      </Heading>
    </div>
  );
}
