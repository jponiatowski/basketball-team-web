import { Heading, Table } from '@radix-ui/themes';
import { getTeamTablePageData } from './actions';
import { cn } from '@/base/utils';

export default async function TabelaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getTeamTablePageData(slug);

  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1" size="8">
        Tabela
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Lp.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Drużyna</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">
              Mecze
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">
              Zwycięstwa
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">
              Porażki
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">
              Punkty
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.table.map((item, index) => {
            const tableCellClasses = cn('text-center', {
              'font-semibold': item.teamId === data.team.id,
            });
            return (
              <Table.Row key={item.teamId}>
                <Table.Cell
                  className={cn({
                    'font-semibold': item.teamId === data.team.id,
                  })}
                >
                  {index + 1}
                </Table.Cell>
                <Table.Cell
                  className={cn('text-left', {
                    'font-semibold': item.teamId === data.team.id,
                  })}
                >
                  {item.name}
                </Table.Cell>
                <Table.Cell className={tableCellClasses}>
                  {item.gamesNumber}
                </Table.Cell>
                <Table.Cell className={tableCellClasses}>
                  {item.wins}
                </Table.Cell>
                <Table.Cell className={tableCellClasses}>
                  {item.losses}
                </Table.Cell>
                <Table.Cell className={tableCellClasses}>
                  {item.points}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
