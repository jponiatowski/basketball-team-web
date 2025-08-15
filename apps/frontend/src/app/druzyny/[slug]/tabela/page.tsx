import { Heading, Separator, Table } from '@radix-ui/themes';
import { getTeamSeoData, getTeamTablePageData } from './actions';
import { cn } from '@/base/utils';
import { Metadata } from 'next';
import { CLUB_NAME } from '@/base/constants';
import { Breadcrumbs } from '@/base/components/breadcrumbs';

type TablePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TablePageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const seo = await getTeamSeoData(slug);

  return {
    title: `Tabela - ${seo.leagueName} (${seo.name}) - ${CLUB_NAME}`,
    description: `Aktualna tabela ligi ${seo.leagueName} (${seo.name}) klubu ${CLUB_NAME}. Sprawdź pozycje drużyn, liczbę punktów, bilans meczów oraz wyniki.`,
  };
}

export default async function TabelaPage({ params }: TablePageProps) {
  const { slug } = await params;
  const data = await getTeamTablePageData(slug);

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: data.team.name ?? 'Drużyna', href: `/druzyny/${slug}` },
          { label: 'Tabela', current: true },
        ]}
      />
      <Heading as="h1" size="8" className="flex items-center gap-3">
        <span>{data.team.name}</span>
        <Separator orientation="vertical" size="2" />
        <span>Tabela</span>
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
