import { Image, Player } from '@/base/types';

export interface TeamPageData {
  esor: {
    leagueId: string;
    teamId: string;
  };
  name: string;
  image: Image;
  coach: {
    image: Image;
    name: string;
    slug: string;
  };
  players: Player[];
}
