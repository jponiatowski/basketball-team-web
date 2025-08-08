import { Medal } from './header-medal';
import type { FC } from 'react';

interface HeaderTrophiesProps {
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
}

export const HeaderTrophies: FC<HeaderTrophiesProps> = ({
  goldMedals,
  silverMedals,
  bronzeMedals,
}) => {
  return (
    <div className="absolute -top-4 left-64 hidden items-center gap-2 xl:flex">
      <Medal count={goldMedals} medal="gold" />
      <Medal count={silverMedals} medal="silver" />
      <Medal count={bronzeMedals} medal="bronze" />
    </div>
  );
};
