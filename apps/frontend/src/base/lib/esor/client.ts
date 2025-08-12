import {
  League,
  LeagueTableItem,
  Player,
  PlayerStatistics,
  Season,
  Team,
} from '@/base/types';
import {
  EsorAllLeagues,
  EsorLeague,
  EsorLeagueTableItem,
  EsorPlayer,
  EsorPlayerStatistics,
  EsorSeason,
  EsorTeam,
  EsorTeams,
  FunctionName,
} from './types';

class EsorTransport {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://esor.pzkosz.pl/api/';

  constructor() {
    const key = process.env.ESOR_API_KEY;

    if (!key) {
      throw new Error('ESOR_API_KEY is not set');
    }
    this.apiKey = key;
  }

  async call<T>(
    fn: FunctionName,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Promise<T> {
    const body = new URLSearchParams();

    body.set('key', this.apiKey);
    body.set('function', fn);

    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) {
        body.set(k, String(v));
      }
    }

    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body,
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`ESOR ${res.status}: ${text || res.statusText}`);
    }
    return (await res.json()) as T & { error?: string };
  }
}

class EsorClient {
  private readonly transport = new EsorTransport();

  async getCurrentSeason(): Promise<Season> {
    const esorData = await this.transport.call<EsorSeason>('getCurrentSeason');

    return {
      id: esorData.id?.toString(),
      name: esorData.nazwa,
      shortName: esorData.skrocona,
    };
  }

  async getTeam(
    teamId: string,
    params?: { seasonId?: string; leagueId?: string }
  ): Promise<Team> {
    const esorData = await this.transport.call<EsorTeam>('getTeam', {
      teamid: teamId,
      seasonid: params?.seasonId,
      leagueid: params?.leagueId,
    });

    return {
      id: esorData.id?.toString(),
      name: esorData.nazwa,
      shortName: esorData.skrocona,
    };
  }

  async getTeams(leagueId: string, seasonId: string): Promise<Team[]> {
    const esorData = await this.transport.call<EsorTeams>('getTeams', {
      leagueid: leagueId,
      seasonid: seasonId,
    });

    return Object.values(esorData).map((team) => ({
      id: team.id?.toString(),
      name: team.nazwa,
      shortName: team.skrocona,
    }));
  }

  async getTeamPlayers(
    teamId: string,
    params?: { seasonId?: string }
  ): Promise<Player[]> {
    const esorData = await this.transport.call<EsorPlayer[]>('getTeamPlayers', {
      teamid: teamId,
      seasonid: params?.seasonId,
    });

    const mappedPlayers = esorData.map((player) => ({
      id: player.id?.toString(),
      firstName: player.imie,
      lastName: player.nazwisko,
      photo: player.foto,
      height: player.wzrost,
      position: player.pozycja,
    }));

    // Filter out duplicates by player id
    const uniquePlayers = mappedPlayers.filter(
      (player, index, self) =>
        index === self.findIndex((p) => p.id === player.id)
    );

    return uniquePlayers;
  }

  async getLeague(leagueId: string): Promise<League> {
    const esorData = await this.transport.call<EsorLeague>('getLeague', {
      leagueid: leagueId,
    });

    return {
      id: esorData.id?.toString(),
      name: esorData.nazwa,
      shortName: esorData.skrocona,
      acronym: esorData.skrot,
    };
  }

  async getAllLeagues(): Promise<League[]> {
    const esorData = await this.transport.call<EsorAllLeagues>('getAllLeagues');
    return Object.values(esorData).map((league) => ({
      id: league.id?.toString(),
      name: league.nazwa,
      shortName: league.skrocona,
      acronym: league.skrot,
    }));
  }

  async getLeagueTable(
    leagueId: string,
    seasonId: string
  ): Promise<LeagueTableItem[]> {
    const esorData = await this.transport.call<EsorLeagueTableItem[]>(
      'getLeagueTable',
      {
        leagueid: leagueId,
        seasonid: seasonId,
      }
    );
    return esorData.map((item) => ({
      name: item.nazwa,
      shortName: item.skrocona,
      teamId: item.teamid?.toString(),
      gamesNumber: item.mecze,
      wins: item.zw,
      losses: item.por,
      points: item.pkt,
    }));
  }

  async getPlayer(playerId: string): Promise<Player> {
    const esorData = await this.transport.call<EsorPlayer[]>('getPlayer', {
      playerid: playerId,
    });

    return {
      id: esorData?.[0]?.id?.toString(),
      firstName: esorData?.[0]?.imie,
      lastName: esorData?.[0]?.nazwisko,
      photo: esorData?.[0]?.foto,
    };
  }

  async getPlayerStatistics(playerId: string): Promise<PlayerStatistics[]> {
    const esorData = await this.transport.call<EsorPlayerStatistics[]>(
      'getPlayerStatistics',
      {
        playerid: playerId,
      }
    );

    return esorData.map((stat) => ({
      seasonId: stat.seasonid?.toString(),
      leagueId: stat.leagueid?.toString(),
      teamId: stat.teamid?.toString(),
      team: {
        id: stat.team?.id?.toString(),
        name: stat.team?.nazwa,
        shortName: stat.team?.skrocona,
      },
      league: {
        id: stat.league?.id?.toString(),
        name: stat.league?.nazwa,
        shortName: stat.league?.skrocona,
        acronym: stat.league?.skrot,
      },
      season: {
        id: stat.sezon?.id?.toString(),
        name: stat.sezon?.nazwa,
        shortName: stat.sezon?.skrocona,
      },
      gamesNumber: stat.ile_meczow,
      timePlayed: (() => {
        const totalSeconds = Math.round(stat.min);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      })(),
      twoPointShotsMade: stat.c2,
      twoPointShotsAttempted: stat.w2,
      threePointShotsMade: stat.c3,
      threePointShotsAttempted: stat.w3,
      freeThrowsMade: stat.c1,
      freeThrowsAttempted: stat.w1,
      totalRebounds: stat.Sum,
      offensiveRebounds: stat.A,
      defensiveRebounds: stat.O,
      assists: stat.As,
      steals: stat.P,
      blocks: stat.B,
      turnovers: stat.S,
      personalFouls: stat.F,
      eval: stat.Eval,
      points: stat.Pkt,
    }));
  }
}

export const esorClient = new EsorClient();
