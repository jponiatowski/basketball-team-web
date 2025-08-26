import { Button, Card } from '@radix-ui/themes';
import { esorClient } from '../../../lib/esor/client';
import { TeamLogo } from '../../team-logo';
import { cn } from '../../../utils';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

interface GameCardProps {
  leagueId: string;
  roundId: string;
  groupId: string;
  homeTeamId: string;
  awayTeamId: string;
}

const getData = async (
  leagueId: string,
  roundId: string,
  groupId: string,
  homeTeamId: string,
  awayTeamId: string
) => {
  const season = await esorClient.getCurrentSeason();
  const game = await esorClient.getTimetable(leagueId, season.id, {
    roundId,
    groupId,
    homeTeamId,
    awayTeamId,
  });

  return {
    homeTeam: {
      name: game[0].homeTeam.name,
      logo: game[0].homeTeam.logo,
    },
    awayTeam: {
      name: game[0].awayTeam.name,
      logo: game[0].awayTeam.logo,
    },
    scoreByQuarters: game[0].scoreByQuarters,
    finalScore: game[0].finished ? game[0].finalScore : '--:--',
    leagueName: game[0].league.name,
    leg: game[0].leg,
    statsUrl: game[0].statsUrl,
  };
};

export async function GameCard({
  leagueId,
  roundId,
  groupId,
  homeTeamId,
  awayTeamId,
}: GameCardProps) {
  const {
    homeTeam,
    awayTeam,
    finalScore,
    leagueName,
    leg,
    statsUrl,
    scoreByQuarters,
  } = await getData(leagueId, roundId, groupId, homeTeamId, awayTeamId);

  return (
    <div className="my-4">
      <Card
        size={{ initial: '2', md: '4' }}
        className="group relative mx-auto w-full max-w-2xl cursor-pointer"
      >
        <div className="flex flex-col gap-4">
          <div className="mx-auto flex flex-col text-center">
            <div className="text-base font-semibold">
              {leagueName.toUpperCase()}
            </div>
            <div className="text-sm text-gray-500">{leg}</div>
          </div>
          <div className="mx-auto flex items-center justify-center gap-4">
            <div className="flex flex-col-reverse items-center justify-center gap-1 lg:flex-row lg:gap-4">
              <div className="w-24 text-center text-xs lg:w-32 lg:text-right lg:text-sm">
                {homeTeam.name}
              </div>
              <TeamLogo logo={homeTeam.logo} name={homeTeam.name} />
            </div>
            <div className={cn('flex flex-col gap-1', 'mt-3')}>
              <div className="text-secondary-600 text-center text-lg font-bold">
                {finalScore}
              </div>
              <div
                className={cn(
                  'hidden lg:block',
                  'text-center text-xs text-gray-500'
                )}
              >{`(${scoreByQuarters.join(', ')})`}</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 lg:flex-row lg:gap-4">
              <TeamLogo logo={awayTeam.logo} name={awayTeam.name} />
              <div className="w-24 text-center text-xs lg:w-32 lg:text-left lg:text-sm">
                {awayTeam.name}
              </div>
            </div>
          </div>
          <Button className="!mt-4 sm:!mx-auto sm:!w-fit lg:!hidden" asChild>
            <Link href={statsUrl} target="_blank">
              Statystyki
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <Link
          href={statsUrl}
          target="_blank"
          className={cn(
            'hidden lg:flex',
            'items-center justify-center',
            'bg-primary-600 opacity-0 group-hover:opacity-100',
            'absolute inset-0',
            'transition-opacity duration-300 ease-in-out',
            'text-lg font-semibold text-white'
          )}
        >
          Statystyki
        </Link>
      </Card>
    </div>
  );
}
