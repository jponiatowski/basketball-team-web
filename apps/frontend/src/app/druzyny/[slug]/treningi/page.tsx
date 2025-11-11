import { Breadcrumbs } from '@/base/components/breadcrumbs';
import { Card, Separator, Table } from '@radix-ui/themes';
import { getTeamPracticePageData, getTeamPracticePageSeoData } from './actions';
import { TeamPageHeading } from '@/base/components/team-page-heading';
import { AvatarsGroup } from './components/avatars-group';
import { ChevronDown, MailIcon, PhoneIcon } from 'lucide-react';
import { Collapsible } from 'radix-ui';
import { Fragment } from 'react';
import Image from 'next/image';
import { cn } from '@/base/utils';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const seo = await getTeamPracticePageSeoData(slug);

  return {
    title: `Treningi - ${seo.title}`,
    description: `Sprawdź terminy i miejsca treningów koszykarskich dla ${seo.ageGroup.from}-${seo.ageGroup.to} latków w klubie Exact Systems Śląsk Wrocław. Dołącz do najlepszej koszykarskiej akademii we Wrocławiu i rozwijaj swoje umiejętności.`,
  };
};

export default async function TreningiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamPracticePageData(slug);
  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: team.name, href: `/druzyny/${slug}` },
          { label: 'Treningi', current: true },
        ]}
      />
      <TeamPageHeading teamName={team.name} title="Treningi" />
      <Table.Root className="hidden md:table">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Dzień</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Godzina</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Miejsce</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Trenerzy
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {team?.practice?.map((practice, index) => (
            <Fragment key={index}>
              <Table.Row key={index} align="center">
                <Table.Cell className="font-semibold">
                  {practice.day}
                </Table.Cell>
                <Table.Cell>{practice.details.time}</Table.Cell>
                <Table.Cell>{practice.details.place}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <AvatarsGroup coaches={practice.details.coach} />
                </Table.Cell>
              </Table.Row>
            </Fragment>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="flex flex-col gap-2 md:hidden">
        {team?.practice?.map((practice, index) => (
          <Card key={index}>
            <Collapsible.Root className="group flex flex-col gap-2">
              <Collapsible.Trigger>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col justify-center gap-1">
                    <div className="text-base font-bold">
                      {practice.day}, {practice.details.time}
                    </div>
                    <div className="text-left text-sm text-gray-600">
                      {practice.details.place}
                    </div>
                  </div>

                  <ChevronDown
                    size={24}
                    className="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
                  />
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content className="collapsible-content flex flex-col gap-2">
                <Separator size="4" className="my-2" />
                <div className="text-base font-bold">Trenerzy</div>
                <div className="flex flex-col gap-3">
                  {practice.details.coach.map((coach) => (
                    <div>
                      <div key={coach.id} className="flex items-center gap-2">
                        <figure className="relative size-10">
                          <Image
                            src={coach.image.url}
                            alt={coach.name}
                            fill
                            className="flex-shrink-0 rounded-full object-cover object-top"
                            sizes="40px"
                            placeholder="blur"
                            blurDataURL={coach.image.placeholder}
                          />
                        </figure>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-bold">{coach.name}</div>
                          <div
                            className={cn('text-sm', 'flex items-center gap-1')}
                          >
                            <PhoneIcon size={12} />
                            {coach.contactDetails.phone}
                          </div>
                          <div
                            className={cn('text-sm', 'flex items-center gap-1')}
                          >
                            <MailIcon size={12} />
                            {coach.contactDetails.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </Card>
        ))}
      </div>
    </div>
  );
}
