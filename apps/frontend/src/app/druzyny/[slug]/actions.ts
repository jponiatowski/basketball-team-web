import { teamQuery, teamSeoQuery } from '@/base/lib/sanity/queries';
import { sanityFetch } from '@/base/lib/sanity/live';
import { TeamQueryResult, TeamSeoQueryResult } from '@/base/lib/sanity/types';
import { esorClient } from '@/base/lib/esor/client';
import { Player } from '@/base/types';
import { imageResolver } from '@/base/lib/sanity/utils';
import { notFound } from 'next/navigation';

export const getTeamPageData = async (slug: string) => {
  const team = (await sanityFetch({
    query: teamQuery,
    params: { slug: `/druzyny/${slug}` },
  })) as {
    data: TeamQueryResult | null;
  };

  if (!team?.data) {
    notFound();
  }

  const season = await esorClient.getCurrentSeason();

  let players: Player[] = [];

  if (!!team.data?.esorData?.teamId) {
    players = await esorClient.getTeamPlayers(team.data.esorData.teamId, {
      seasonId: season.id,
    });
  }

  return {
    esor: {
      leagueId: team.data?.esorData?.leagueId,
      teamId: team.data?.esorData?.teamId,
    },
    name: team.data?.name,
    image: imageResolver(team.data?.image),
    coach: team.data?.coach,
    players,
  };
};

export const getTeamSeoData = async (slug: string) => {
  const seo = (await sanityFetch({
    query: teamSeoQuery,
    params: { slug: `/druzyny/${slug}` },
  })) as {
    data: TeamSeoQueryResult | null;
  };

  return {
    title: seo.data?.seo?.title || undefined,
    description: seo.data?.seo?.description || undefined,
    image: imageResolver(seo.data?.seo?.image) || undefined,
  };
};
