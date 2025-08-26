import { esorClient } from '@/base/lib/esor/client';
import { Card, Table } from '@radix-ui/themes';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { TeamLogo } from '../../team-logo';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { capitalizeFirstLetter, cn } from '@/base/utils';

interface TimetableProps {
  seasonId: string;
  leagueId: string;
  roundId: string;
  groupId: string;
}

const getData = async ({
  leagueId,
  seasonId,
  roundId,
  groupId,
}: TimetableProps) => {
  const timetable = await esorClient.getTimetable(leagueId, seasonId, {
    roundId,
    groupId,
  });

  const sortedTimetable = timetable.sort(
    (a, b) => Number(a.date) - Number(b.date)
  );

  // Group by date
  const groupedByDate = sortedTimetable.reduce(
    (acc, item) => {
      const dateKey = format(
        new Date(Number(item.date) * 1000),
        'eeee (dd.MM.yyyy)',
        {
          locale: pl,
        }
      );
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    },
    {} as Record<string, typeof timetable>
  );

  return {
    timetable,
    groupedByDate,
    // groupedByDate,
  };
};

export const Timetable = async (props: TimetableProps) => {
  const data = await getData(props);
  console.log(data);
  return (
    <div className="flex flex-col gap-8">
      {Object.entries(data?.groupedByDate ?? {}).map(([date, items]) => (
        <Table.Root key={date} variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell
                colSpan={5}
                className="!bg-primary-500 !text-center text-lg !text-white"
              >
                {capitalizeFirstLetter(date)}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row
                key={item.id}
                align="center"
                className="last-child:border-0"
              >
                <Table.Cell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5" />
                    {format(new Date(Number(item.date) * 1000), 'kk:mm', {
                      locale: pl,
                    })}
                  </div>
                </Table.Cell>
                <Table.Cell className="w-52 text-center">
                  {item.homeTeam.name}
                </Table.Cell>

                <Table.Cell>vs</Table.Cell>

                <Table.Cell className="w-52 text-center">
                  {item.awayTeam.name}
                </Table.Cell>
                <Table.Cell className="text-secondary-600 font-bold hover:underline">
                  <Link href={item.statsUrl} target="_blank">
                    {item.finalScore}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ))}
    </div>
  );
};
