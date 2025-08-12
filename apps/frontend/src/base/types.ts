export interface Image {
  url: string;
  placeholder?: string;
}

export interface Link {
  url: string;
  target: string;
}

export interface Season {
  id: string;
  name: string;
  shortName: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface PlayerStatistics {
  seasonId: string;
  season?: Partial<Season>;
  leagueId: string;
  league?: Partial<League>;
  teamId: string;
  team?: Partial<Team>;
  gamesNumber: number;
  timePlayed: string;
  twoPointShotsMade: number;
  twoPointShotsAttempted: number;
  threePointShotsMade: number;
  threePointShotsAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  totalRebounds: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  eval: number;
  points: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  height?: number;
  position?: string;
}

export interface League {
  id: string;
  name: string;
  shortName: string;
  acronym: string;
}

export interface LeagueTableItem {
  name: string;
  shortName: string;
  teamId: string;
  gamesNumber: number;
  wins: number;
  losses: number;
  points: number;
}
