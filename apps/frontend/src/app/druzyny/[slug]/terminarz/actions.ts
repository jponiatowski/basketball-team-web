import { esorClient } from '@/base/lib/esor/client';
import { sanityFetch } from '@/base/lib/sanity/live';
import {
  timetablePageQuery,
  timetablePageSeoQuery,
} from '@/base/lib/sanity/queries';
import { notFound } from 'next/navigation';

export const getTeamTimetable = async (slug: string) => {
  const team = await sanityFetch({
    query: timetablePageQuery,
    params: { slug: `/druzyny/${slug}` },
  });

  if (!team?.data?.esorData?.leagueId || !team?.data?.esorData?.teamId) {
    notFound();
  }

  const season = await esorClient.getCurrentSeason();

  const timetable = await esorClient.getTimetable(
    team.data?.esorData?.leagueId,
    season.id,
    {
      roundId: team.data?.esorData?.roundId,
      groupId: team.data?.esorData?.groupId,
      teamId: team.data?.esorData?.teamId,
    }
  );
  return { timetable, team };
};

export const getTeamTimetableSeoData = async (slug: string) => {
  const team = await sanityFetch({
    query: timetablePageSeoQuery,
    params: { slug: `/druzyny/${slug}` },
  });

  return {
    teamName: team.data?.name,
  };
};
