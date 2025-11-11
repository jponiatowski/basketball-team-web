import { Text } from '@radix-ui/themes';

import { cn } from '@/base/utils';

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
