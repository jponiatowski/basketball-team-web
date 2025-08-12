import { esorClient } from '@/base/lib/esor/client';
import { Heading, Table } from '@radix-ui/themes';
import Image from 'next/image';

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await esorClient.getPlayer(id);
  const statistics = await esorClient.getPlayerStatistics(id);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {player.photo && (
          <Image
            src={player.photo}
            alt={`${player.firstName} ${player.lastName}`}
            width={150}
            height={150}
          />
        )}
        <Heading as="h1" size="4">
          {player.firstName} {player.lastName}
        </Heading>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Sezon</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Liga</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Drużyna</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Mecze</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Minuty</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Punkty</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>EVAL</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>2P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>3P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>1P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reb</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>As</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>St</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Bl</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>F</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {statistics.map((stat) => (
            <Table.Row key={stat.seasonId}>
              <Table.Cell>{stat.season?.name}</Table.Cell>
              <Table.Cell>{stat.league?.shortName}</Table.Cell>
              <Table.Cell>{stat.team?.name || '-'}</Table.Cell>
              <Table.Cell>{stat.gamesNumber || '-'}</Table.Cell>
              <Table.Cell>{stat.timePlayed || '-'}</Table.Cell>
              <Table.Cell>{stat.points || '-'}</Table.Cell>
              <Table.Cell>{stat.eval || '-'}</Table.Cell>
              <Table.Cell>{stat.twoPointShotsMade || '-'}</Table.Cell>
              <Table.Cell>{stat.threePointShotsMade || '-'}</Table.Cell>
              <Table.Cell>{stat.freeThrowsMade || '-'}</Table.Cell>
              <Table.Cell>{stat.totalRebounds || '-'}</Table.Cell>
              <Table.Cell>{stat.assists || '-'}</Table.Cell>
              <Table.Cell>{stat.steals || '-'}</Table.Cell>
              <Table.Cell>{stat.blocks || '-'}</Table.Cell>
              <Table.Cell>{stat.turnovers || '-'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
