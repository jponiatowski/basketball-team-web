import { esorClient } from '@/base/lib/esor/client';
import { tablePageQuery } from '@/base/lib/sanity/queries';
import { sanityFetch } from '@/base/lib/sanity/live';
import { notFound } from 'next/navigation';

export const getTeamTablePageData = async (slug: string) => {
  const team = await sanityFetch({
    query: tablePageQuery,
    params: { slug: `/druzyny/${slug}` },
  });

  if (!team?.data?.esorData?.leagueId || !team?.data?.esorData?.teamId) {
    notFound();
  }

  const season = await esorClient.getCurrentSeason();
  const groups = await esorClient.getGroups(
    team.data?.esorData?.leagueId,
    season.id
  );

  const table = await esorClient.getLeagueTable(
    team.data?.esorData?.leagueId,
    '27',
    team.data?.esorData?.groupId
  );

  return {
    team: {
      name: team.data?.name,
      id: team.data?.esorData?.teamId?.toString(),
    },
    table,
    groups,
  };
};
