import { esorClient } from '@/base/lib/esor/client';
import { Table, Text } from '@radix-ui/themes';
import { pl } from 'date-fns/locale';
import { format } from 'date-fns';

interface RecordsTableProps {
  playerId: string;
}

export async function RecordsTable({ playerId }: RecordsTableProps) {
  const records = await esorClient.getPlayerRecords(playerId);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Statystyka</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Wartość</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Data</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Liga</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Sezon</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text wrap="nowrap">Mecz</Text>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Punkty</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.points.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.points.date && records.points.date !== '-'
                ? format(
                    new Date(Number(records.points.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.points.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.points.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.points.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Celne za 1 pkt</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.freeThrowsMade.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.freeThrowsMade.date &&
              records.freeThrowsMade.date !== '-'
                ? format(
                    new Date(Number(records.freeThrowsMade.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.freeThrowsMade.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.freeThrowsMade.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.freeThrowsMade.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Celne za 2 pkt</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.twoPointShotsMade.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.twoPointShotsMade.date &&
              records.twoPointShotsMade.date !== '-'
                ? format(
                    new Date(Number(records.twoPointShotsMade.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.twoPointShotsMade.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.twoPointShotsMade.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.twoPointShotsMade.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Celne za 3 pkt</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.threePointsMade.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.threePointsMade.date &&
              records.threePointsMade.date !== '-'
                ? format(
                    new Date(Number(records.threePointsMade.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.threePointsMade.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.threePointsMade.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.threePointsMade.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Asysty</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.assists.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.assists.date && records.assists.date !== '-'
                ? format(
                    new Date(Number(records.assists.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.assists.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.assists.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.assists.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Zbiórki</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsSum.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsSum.date && records.reboundsSum.date !== '-'
                ? format(
                    new Date(Number(records.reboundsSum.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsSum.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsSum.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsSum.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Zbiórki w ataku</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsOffensive.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsOffensive.date &&
              records.reboundsOffensive.date !== '-'
                ? format(
                    new Date(Number(records.reboundsOffensive.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsOffensive.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsOffensive.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsOffensive.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Zbiórki w obronie</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsDefensive.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsDefensive.date &&
              records.reboundsDefensive.date !== '-'
                ? format(
                    new Date(Number(records.reboundsDefensive.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsDefensive.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsDefensive.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.reboundsDefensive.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Przechwyty</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.steals.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.steals.date && records.steals.date !== '-'
                ? format(
                    new Date(Number(records.steals.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.steals.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.steals.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.steals.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Bloki</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.blocks.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.blocks.date && records.blocks.date !== '-'
                ? format(
                    new Date(Number(records.blocks.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.blocks.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.blocks.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.blocks.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Starty</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.turnovers.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.turnovers.date && records.turnovers.date !== '-'
                ? format(
                    new Date(Number(records.turnovers.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.turnovers.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.turnovers.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.turnovers.game}
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text wrap="nowrap">Faule</Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.fouls.value}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.fouls.date && records.fouls.date !== '-'
                ? format(
                    new Date(Number(records.fouls.date) * 1000),
                    'dd.MM.yyyy',
                    { locale: pl }
                  )
                : '-'}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.fouls.league}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.fouls.season}
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text wrap="nowrap" weight="medium">
              {records.fouls.game}
            </Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
