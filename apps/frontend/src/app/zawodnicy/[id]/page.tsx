import { esorClient } from '@/base/lib/esor/client';
import {
  Heading,
  Table,
  Tabs,
  Box,
  Separator,
  Text,
  Flex,
  Skeleton,
} from '@radix-ui/themes';
import Image from 'next/image';
import { AverageTable } from './components/average';
import { Suspense } from 'react';
import { cn } from '@/base/utils';
import { RecordsTable } from './components/records';
import { TablePlaceholder } from './components/table-placeholder';
import { Player } from '@/base/types';

interface PlayerDataProps {
  player: Player;
  className?: string;
}

export function PlayerData({ player, className }: PlayerDataProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        'sm:grid sm:grid-cols-3 sm:gap-8',
        className
      )}
    >
      <div className={cn('flex items-center gap-2 sm:flex-col sm:items-start')}>
        <Text size="2" color="gray">
          Obywatelstwo
        </Text>
        <Text size="3" weight="bold">
          {player.nationality || '-'}
        </Text>
      </div>
      <div className={cn('flex items-center gap-2 sm:flex-col sm:items-start')}>
        <Text size="2" color="gray">
          Wzrost
        </Text>
        <Text size="3" weight="bold">
          {player.height || '-'}
        </Text>
      </div>
      <div className={cn('flex items-center gap-2 sm:flex-col sm:items-start')}>
        <Text size="2" color="gray">
          Wiek
        </Text>
        <Text size="3" weight="bold">
          {player.age || '-'}
        </Text>
      </div>
    </div>
  );
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await esorClient.getPlayer(id);

  return (
    <div className="flex flex-col gap-4">
      <div className={cn('flex items-start gap-8', 'sm:mb-6')}>
        {player.photo && (
          <figure className="relative aspect-[3/4] w-52 rounded-sm">
            <Image
              src={player.photo}
              alt={`${player.firstName} ${player.lastName}`}
              fill
              className="rounded-sm object-cover object-top"
              sizes="160px"
            />
          </figure>
        )}
        <div>
          <Heading as="h1" size={{ initial: '6', sm: '8' }} mb="4">
            {player.firstName} {player.lastName}
          </Heading>
          <Flex
            gap="2"
            align={{ initial: 'start', sm: 'center' }}
            direction={{ initial: 'column', sm: 'row' }}
          >
            {player?.number ? (
              <Text
                size={{ initial: '2', sm: '4' }}
                color="gray"
              >{`#${player.number}`}</Text>
            ) : null}
            <Separator orientation="vertical" className="!hidden sm:!block" />
            {player?.position ? (
              <Text color="gray" size={{ initial: '2', sm: '4' }}>
                {player.position}
              </Text>
            ) : null}
          </Flex>
          <Separator my="4" size="4" className="!hidden sm:!block" />
          <PlayerData player={player} className="!hidden sm:!grid" />
        </div>
      </div>

      <Separator my="4" size="4" className="!block sm:!hidden" />
      <PlayerData player={player} className="!flex sm:!hidden" />
      <Separator my="4" size="4" className="!block sm:!hidden" />

      <Tabs.Root defaultValue="average">
        <Tabs.List>
          <Tabs.Trigger value="average">Średnie</Tabs.Trigger>
          <Tabs.Trigger value="records">Rekordy</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="average">
            <Suspense fallback={<TablePlaceholder />}>
              <AverageTable playerId={id} />
            </Suspense>
          </Tabs.Content>

          <Tabs.Content value="records">
            <Suspense fallback={<TablePlaceholder />}>
              <RecordsTable playerId={id} />
            </Suspense>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
