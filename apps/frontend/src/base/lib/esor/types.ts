export type FunctionName =
  | 'getCurrentSeason'
  | 'getTeamPlayers'
  | 'getTeam'
  | 'getTeams'
  | 'getLeague'
  | 'getPlayer'
  | 'getPlayerStatistics'
  | 'getLeagueTable'
  | 'getAllLeagues'
  | 'getRounds'
  | 'getGroups'
  | 'getTimetable';

export type EsorId = number | string;

export interface EsorSeason {
  id: EsorId;
  nazwa: string;
  skrocona: string;
}

export interface EsorTeam {
  id: EsorId;
  nazwa: string;
  skrocona: string;
  logo?: string;
}

export type EsorTeams = Record<string, EsorTeam>;

export interface EsorPlayer {
  id: EsorId;
  imie: string;
  nazwisko: string;
  foto?: string;
  wzrost?: number;
  pozycja?: string;
}

export interface EsorPlayerStatistics {
  seasonid: EsorId;
  leagueid: EsorId;
  teamid: EsorId;
  team?: Partial<EsorTeam>;
  league?: Partial<EsorLeague>;
  sezon?: Partial<EsorSeason>;
  ile_meczow: number;
  min: number;
  c2: number;
  w2: number;
  c3: number;
  w3: number;
  c1: number;
  w1: number;
  A: number;
  O: number;
  Sum: number;
  As: number;
  S: number;
  P: number;
  B: number;
  F: number;
  Pkt: number;
  Eval: number;
}

export interface EsorLeague {
  id: EsorId;
  nazwa: string;
  skrocona: string;
  skrot: string;
  typ: number;
}

export type EsorAllLeagues = Record<string, EsorLeague>;

export interface EsorLeagueTableItem {
  nazwa: string;
  skrocona: string;
  teamid: EsorId;
  mecze: number;
  zw: number;
  por: number;
  pkt: number;
  stoszdstr: number;
}

export interface EsorRound {
  id: EsorId;
  nazwa: string;
  nazwaskrocona: string;
}

export interface EsorGroup {
  id: EsorId;
  nazwa: string;
}

export interface EsorAllGroups {
  grupy: EsorGroup[];
}

export interface EsorLine {
  id: EsorId;
  nazwa: string;
}

export interface EsorTimetableItem {
  id: EsorId;
  nrmeczu: number;
  data: string;
  mdata: string;
  koniec: 0 | 1;
  walkower: number;
  anulowany: number;
  przelozony: number;
  widzowie: number;
  wynik1: number;
  wynik2: number;
  kwarta1: number;
  kwarta2: number;
  kwarta3: number;
  kwarta4: number;
  dogrywka1: number;
  dogrywka2: number;
  dogrywka3: number;
  dogrywka4: number;
  dogrywka5: number;
  rzuty: number;
  k1: EsorTeam;
  k1txt: string;
  k2: EsorTeam;
  k2txt: string;
  liga: EsorLeague;
  poziom: EsorRound;
  kolejka: EsorLine;
}

export interface EsorTimetable {
  cnt: number;
  page: number;
  ilestron: number;
  items: Record<string, EsorTimetableItem>;
}
