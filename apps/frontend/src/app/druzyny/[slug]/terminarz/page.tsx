import { Button, Card, Link } from '@radix-ui/themes';
import { getTeamTimetable, getTeamTimetableSeoData } from './actions';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { cn } from '@/base/utils';
import { ArrowRightIcon, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumbs } from '@/base/components/breadcrumbs';
import { CLUB_NAME } from '@/base/constants';
import { TeamPageHeading } from '@/base/components/team-page-heading';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { teamName } = await getTeamTimetableSeoData(slug);
  return {
    title: `Terminarz - ${teamName} - ${CLUB_NAME}`,
    description: `Terminarz rozgrywek ligi ${teamName} klubu ${CLUB_NAME}. Sprawdź daty meczów, godziny rozpoczęcia, rywali i miejsca spotkań.`,
  };
};

export default async function TimetablePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { timetable, team } = await getTeamTimetable(slug);

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: team.data.name ?? 'Drużyna', href: `/druzyny/${slug}` },
          { label: 'Terminarz', current: true },
        ]}
      />
      <TeamPageHeading teamName={team.data.name} title="Terminarz" />
      <div className="flex flex-col gap-2">
        {timetable.map((item) => {
          return (
            <Card key={item.id} size="2">
              <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
                <div className="flex flex-col items-center gap-0 lg:items-start">
                  <span className="font-bold text-gray-950">
                    {format(
                      new Date(Number(item.date) * 1000),
                      'EEEEEE, dd.MM',
                      {
                        locale: pl,
                      }
                    ).toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{item.leg}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className={cn(
                      'text-center font-medium lg:text-right',
                      'w-full max-w-80 lg:w-52',
                      'flex flex-col-reverse items-center gap-4 lg:flex-row lg:justify-end'
                    )}
                  >
                    <span className="text-xs lg:text-sm">
                      {item.homeTeam.name}
                    </span>
                    {item.homeTeam.logo ? (
                      <figure className="relative size-[50px] flex-shrink-0">
                        <Image
                          src={item.homeTeam.logo}
                          alt={item.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </figure>
                    ) : (
                      <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <span className="text-secondary-600 flex-shrink-0 font-bold">
                    {item.homeScore === 0 && item.awayScore === 0
                      ? '--:--'
                      : item.finalScore}
                  </span>
                  <div
                    className={cn(
                      'text-center font-medium lg:text-left',
                      'w-full max-w-80 lg:w-52',
                      'flex flex-col items-center gap-4 lg:flex-row lg:justify-start'
                    )}
                  >
                    {item.awayTeam.logo ? (
                      <figure className="relative size-[50px] flex-shrink-0">
                        <Image
                          src={item.awayTeam.logo}
                          alt={item.awayTeam.name}
                          fill
                          className="object-contain"
                        />
                      </figure>
                    ) : (
                      <div
                        className={cn(
                          'flex flex-shrink-0 items-center justify-center',
                          'h-[50px] w-[50px] rounded-lg',
                          'bg-gray-200'
                        )}
                      >
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <span className="text-xs lg:text-sm">
                      {item.awayTeam.name}
                    </span>
                  </div>
                </div>
                <div className={cn('w-32', 'flex items-center justify-end')}>
                  <Button
                    variant="solid"
                    asChild
                    className={cn('cursor-pointer', '!lg:mt-0 !mt-2', {
                      '!hidden': !item.finished,
                      '!block': item.finished,
                    })}
                  >
                    <Link
                      href={item.statsUrl}
                      target="_blank"
                      className="block"
                    >
                      Statystyki
                      <ArrowRightIcon size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
