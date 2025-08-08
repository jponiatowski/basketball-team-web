import { cn } from '@/base/utils';
import Image from 'next/image';
import type { FC } from 'react';

interface MedalProps {
  count: number;
  medal: 'gold' | 'silver' | 'bronze';
}

export const Medal: FC<MedalProps> = ({ count, medal }) => {
  return (
    <figure className="relative size-14">
      <span
        className={cn(
          'absolute bottom-[9px] z-50 text-sm font-semibold text-gray-900',
          'left-1/2 -translate-x-1/2'
        )}
      >
        {count}
      </span>
      <Image src={`/svg/${medal}-medal.svg`} alt="trophy" fill sizes="56px" />
    </figure>
  );
};
