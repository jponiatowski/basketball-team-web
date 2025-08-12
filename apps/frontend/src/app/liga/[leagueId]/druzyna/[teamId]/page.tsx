import { Heading } from '@radix-ui/themes';
import { getTeamPageData } from './actions';

export default async function TeamPage({
  params,
}: {
  params: Promise<{ leagueId: string; teamId: string }>;
}) {
  const { leagueId, teamId } = await params;

  const { team, league, players } = await getTeamPageData(leagueId, teamId);

  return (
    <div className="flex flex-col gap-4">
      <Heading as="h1" size="8">
        {league.name} - {team.name}
      </Heading>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.firstName} {player.lastName} {player.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
