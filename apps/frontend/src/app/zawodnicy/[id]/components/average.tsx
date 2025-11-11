import { esorClient } from '@/base/lib/esor/client';
import { Heading, Table, Tabs, Box, Skeleton, Text } from '@radix-ui/themes';
import { id } from 'date-fns/locale';

interface AverageTableProps {
  playerId: string;
}

export async function AverageTable({ playerId }: AverageTableProps) {
  const statistics = await esorClient.getPlayerStatistics(playerId);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Sezon</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Liga</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Drużyna</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Mecze</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Minuty</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Punkty</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">EVAL</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">2P</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">3P</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">1P</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Reb</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">As</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">St</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Bl</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">F</Text>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {statistics.map((stat) => (
          <Table.Row key={`${stat.seasonId}-${stat.leagueId}`}>
            <Table.Cell>
              <Text wrap="nowrap">{stat.season?.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.league?.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.team?.name || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.gamesNumber || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">
                {stat?.timePlayed === '0:00' || !stat?.timePlayed
                  ? '-'
                  : stat.timePlayed}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.points || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.eval || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.twoPointShotsMade || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.threePointShotsMade || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.freeThrowsMade || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.totalRebounds || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.assists || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.steals || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.blocks || '-'}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text wrap="nowrap">{stat.turnovers || '-'}</Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
