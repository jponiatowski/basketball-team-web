import {
  practicePageQuery,
  practicePageSeoQuery,
} from '@/base/lib/sanity/queries';
import { sanityFetch } from '@/base/lib/sanity/live';
import {
  PracticePageQueryResult,
  PracticePageSeoQueryResult,
} from '@/base/lib/sanity/types';
import { Practice } from '@/base/types';
import { notFound } from 'next/navigation';
import { getDayName } from './utils';
import { imageResolver } from '@/base/lib/sanity/utils';

export const getTeamPracticePageData = async (
  slug: string
): Promise<{
  name: string;
  practice: Practice[];
}> => {
  const team = (await sanityFetch({
    query: practicePageQuery,
    params: { slug: `/druzyny/${slug}` },
  })) as { data: PracticePageQueryResult | null };

  if (!team.data) {
    notFound();
  }
  const practice: Practice[] = [];

  for (const practiceItem of team.data?.practice ?? []) {
    for (const detail of practiceItem.details ?? []) {
      practice.push({
        day: getDayName(practiceItem.day ?? ''),
        details: {
          time: detail.time ?? '',
          place: detail.place ?? '',
          coach:
            detail.coach?.map((coach) => ({
              id: coach._id,
              name: coach.name,
              slug: coach.slug.current,
              contactDetails: coach.contactDetails,
              image: imageResolver(coach.image),
            })) ?? [],
        },
      });
    }
  }

  return {
    name: team.data?.name ?? '',
    practice,
  };
};

export const getTeamPracticePageSeoData = async (slug: string) => {
  const team = (await sanityFetch({
    query: practicePageSeoQuery,
    params: { slug: `/druzyny/${slug}` },
  })) as { data: PracticePageSeoQueryResult | null };

  return {
    title: team.data?.name ?? '',
    ageGroup: team.data?.ageGroup ?? { from: 0, to: 0 },
  };
};
