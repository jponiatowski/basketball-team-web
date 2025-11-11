import {
  League,
  LeagueTableItem,
  Player,
  PlayerStatistics,
  Round,
  Season,
  Team,
  Group,
  TimetableItem,
} from '@/base/types';
import {
  EsorAllLeagues,
  EsorAllGroups,
  EsorLeague,
  EsorLeagueTableItem,
  EsorPlayer,
  EsorPlayerStatistics,
  EsorRound,
  EsorSeason,
  EsorTeam,
  EsorTeams,
  FunctionName,
  EsorTimetable,
  IEsorClient,
  IEsorTransport,
  EsorId,
  EsorPlayerRecords,
  EsorRecordData,
} from './types';
import { calculateAge } from '@/base/utils';

class EsorTransport implements IEsorTransport {
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

class EsorClient implements IEsorClient {
  private readonly transport: EsorTransport;

  constructor() {
    this.transport = new EsorTransport();
  }

  async getCurrentSeason(): Promise<Season> {
    const esorData = await this.transport.call<EsorSeason>('getCurrentSeason');

    return {
      id: esorData.id?.toString(),
      name: esorData.nazwa,
      shortName: esorData.skrocona,
    };
  }

  async getSeason(id: EsorId) {
    const esorData = await this.transport.call<EsorSeason>('getSeason', {
      seasonid: id,
    });
    return {
      id: esorData.id?.toString(),
      name: esorData.nazwa,
      shortName: esorData.skrocona,
    };
  }

  async getAllSeasons(): Promise<Season[]> {
    const esorData = await this.transport.call<EsorSeason[]>('getAllSeasons');

    return Object.values(esorData)
      .map((season) => ({
        id: season.id?.toString(),
        name: season.nazwa,
        shortName: season.skrocona,
      }))
      .sort((a, b) => Number(b.shortName) - Number(a.shortName));
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

  async getTeams(
    leagueId: string,
    seasonId: string,
    groupId?: string
  ): Promise<Team[]> {
    const esorData = await this.transport.call<EsorTeams>('getTeams', {
      leagueid: leagueId,
      seasonid: seasonId,
      groupid: groupId,
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
    seasonId: string,
    groupId?: string
  ): Promise<LeagueTableItem[]> {
    const esorData = await this.transport.call<EsorLeagueTableItem[]>(
      'getLeagueTable',
      {
        leagueid: leagueId,
        seasonid: seasonId,
        groupid: groupId,
      }
    );

    return esorData
      .map((item) => ({
        name: item.nazwa,
        shortName: item.skrocona,
        teamId: item.teamid?.toString(),
        gamesNumber: item.mecze,
        wins: item.zw,
        losses: item.por,
        points: item.pkt,
      }))
      .sort((a, b) => b.points - a.points);
  }

  async getRounds(leagueId: string, seasonId: string): Promise<Round[]> {
    const esorData = await this.transport.call<EsorRound[]>('getRounds', {
      leagueid: leagueId,
      seasonid: seasonId,
    });

    return esorData.map((round) => ({
      id: round.id?.toString(),
      name: round.nazwa,
      shortName: round.nazwaskrocona,
    }));
  }

  async getGroups(
    leagueId: string,
    seasonId: string,
    roundId?: string
  ): Promise<Group[]> {
    const esorData = await this.transport.call<EsorAllGroups>('getGroups', {
      leagueid: leagueId,
      seasonid: seasonId,
      roundid: roundId,
    });

    return esorData.grupy.map((group) => ({
      id: group.id?.toString(),
      name: group.nazwa,
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
      number: esorData?.[0].numer,
      position: esorData?.[0].pozycja,
      age: calculateAge(esorData?.[0].data_urodzenia),
      height: esorData?.[0].wzrost ? `${esorData[0].wzrost} cm` : undefined,
      nationality:
        esorData?.[0].obywatelstwo?.iso3 || esorData?.[0].obywatelstwo?.iso2,
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

  async getPlayerRecords(playerId: string) {
    const esorData = await this.transport.call<EsorPlayerRecords>(
      'getPlayerRecords',
      {
        playerid: playerId,
      }
    );

    const getRecordData = async (record?: EsorRecordData) => {
      if (!record) {
        return {
          season: '-',
          league: '-',
          date: '-',
          value: '-',
          game: '-',
        };
      }

      const season = await this.getSeason(record.z_kim?.[0].seasonid);

      return {
        season: season.name,
        league: record.z_kim?.[0]?.game?.liga?.nazwa,
        date: record.z_kim?.[0]?.game?.mdata,
        value: record.max,
        game: `${record.z_kim?.[0].game?.k1?.nazwa} - ${record.z_kim?.[0].game?.k2?.nazwa}`,
      };
    };

    const [
      points,
      assists,
      reboundsSum,
      reboundsOffensive,
      reboundsDefensive,
      steals,
      blocks,
      time,
      twoPointShotsMade,
      threePointsMade,
      freeThrowsMade,
      turnovers,
      fouls,
    ] = await Promise.all([
      getRecordData(esorData?.Pkt),
      getRecordData(esorData?.As),
      getRecordData(esorData?.Sum),
      getRecordData(esorData?.A),
      getRecordData(esorData?.O),
      getRecordData(esorData?.P),
      getRecordData(esorData?.B),
      getRecordData(esorData?.min),
      getRecordData(esorData?.c1),
      getRecordData(esorData?.c2),
      getRecordData(esorData?.c3),
      getRecordData(esorData?.S),
      getRecordData(esorData?.F),
    ]);

    return {
      points,
      assists,
      reboundsSum,
      reboundsOffensive,
      reboundsDefensive,
      steals,
      blocks,
      time,
      twoPointShotsMade,
      threePointsMade,
      freeThrowsMade,
      turnovers,
      fouls,
    };
  }

  async getTimetable(
    leagueId: string,
    seasonId: string,
    params?: {
      roundId?: string;
      groupId?: string;
      teamId?: string;
      homeTeamId?: string;
      awayTeamId?: string;
    }
  ): Promise<TimetableItem[]> {
    const esorData = await this.transport.call<EsorTimetable>('getTimetable', {
      leagueid: leagueId,
      seasonid: seasonId,
      round: params?.roundId,
      groupid: params?.groupId,
      team: params?.teamId,
      home: params?.homeTeamId,
      visitor: params?.awayTeamId,
    });

    return Object.values(esorData.items).map((item) => {
      return {
        id: item.id?.toString(),
        homeScore: item.wynik1,
        awayScore: item.wynik2,
        homeTeam: {
          id: item.k1.id?.toString(),
          name: item.k1.nazwa,
          shortName: item.k1.skrocona,
          logo: item.k1.logo,
        },
        awayTeam: {
          id: item.k2.id?.toString(),
          name: item.k2.nazwa,
          shortName: item.k2.skrocona,
          logo: item.k2.logo,
        },
        date: item.mdata,
        round: {
          id: item.poziom.id?.toString(),
          name: item.poziom.nazwa,
          shortName: item.poziom.nazwaskrocona,
        },
        leg: item.kolejka.nazwa,
        group: {
          id: item.kolejka.id?.toString(),
          name: item.kolejka.nazwa,
        },
        league: {
          id: item.liga.id?.toString(),
          name: item.liga.nazwa,
          shortName: item.liga.skrocona,
          acronym: item.liga.skrot,
        },
        scoreByQuarters: [
          item.kwarta1?.toString(),
          item.kwarta2?.toString(),
          item.kwarta3?.toString(),
          item.kwarta4?.toString(),
          item.dogrywka1?.toString(),
          item.dogrywka2?.toString(),
          item.dogrywka3?.toString(),
          item.dogrywka4?.toString(),
          item.dogrywka5?.toString(),
        ].filter(Boolean) as string[],
        finalScore: `${item.wynik1}:${item.wynik2}`,
        finished: Boolean(item.koniec),
        statsUrl:
          item.liga.typ < 2
            ? `https://dzkosz.wroclaw.pl/mecz/${item.id}`
            : `https://rozgrywki.pzkosz.pl/mecz/${item.id}`,
      };
    });
  }
}

export const esorClient = new EsorClient();
