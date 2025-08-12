import { sanityFetch } from '@/base/lib/sanity/live';
import {
  footerQuery,
  headerQuery,
  navigationQuery,
  sponsorsQuery,
} from '@/base/lib/sanity/queries';
import {
  NavigationQueryResult,
  HeaderQueryResult,
  SponsorsQueryResult,
  FooterQueryResult,
} from '@/base/lib/sanity/types';
import { imageResolver, linkResolver } from '@/base/lib/sanity/utils';
import {
  FooterData,
  HeaderData,
  NavigationData,
  NavigationItem,
  Sponsor,
  SponsorsData,
  SponsorType,
} from './types';
import { esorClient } from '@/base/lib/esor/client';
import { Season } from '@/base/types';

const mapNavigationSubItem = (subItem: any): NavigationItem => {
  return {
    label: subItem.label,
    type: subItem._type,
    link:
      subItem._type === 'item' && subItem.link
        ? linkResolver(subItem.link)
        : undefined,
    items:
      subItem._type === 'subItems'
        ? subItem.items?.map(mapNavigationSubItem)
        : undefined,
  };
};

const mapNavigationItem = (item: any): NavigationItem => {
  return {
    label: item.label,
    type: item._type,
    link:
      item._type === 'link' && item.link ? linkResolver(item.link) : undefined,
    items:
      item._type === 'subItems'
        ? item.items?.map(mapNavigationSubItem)
        : undefined,
  };
};

export const getNavigation = async (): Promise<NavigationData> => {
  const navigation = (await sanityFetch({
    query: navigationQuery,
  })) as {
    data: NavigationQueryResult | null;
  };

  return {
    items: navigation.data?.items?.map(mapNavigationItem),
  };
};

export const getHeader = async (): Promise<HeaderData> => {
  const header = (await sanityFetch({
    query: headerQuery,
  })) as {
    data: HeaderQueryResult | null;
  };

  return {
    logo: header.data?.logo?.asset?.url,
    title: header.data?.title,
  };
};

export const getSponsors = async (): Promise<SponsorsData> => {
  const sponsors = (await sanityFetch({
    query: sponsorsQuery,
  })) as {
    data: SponsorsQueryResult | null;
  };

  const strategicSponsors = sponsors.data?.filter(
    (sponsor) => sponsor.type === 'strategic'
  );

  const titleSponsors = sponsors.data?.filter(
    (sponsor) => sponsor.type === 'title'
  );

  const partnerSponsors = sponsors.data?.filter(
    (sponsor) => sponsor.type === 'partner'
  );

  const resolveSponsors = (sponsors: SponsorsQueryResult | undefined) => {
    return sponsors?.map((sponsor) => {
      return {
        type: sponsor.type as SponsorType,
        name: sponsor.name || '',
        link: linkResolver(sponsor?.link),
        image: imageResolver(sponsor?.image),
      };
    });
  };

  return {
    strategicSponsors: resolveSponsors(strategicSponsors),
    titleSponsors: resolveSponsors(titleSponsors),
    partnerSponsors: resolveSponsors(partnerSponsors),
  };
};

export const getFooter = async (): Promise<FooterData> => {
  const footer = (await sanityFetch({
    query: footerQuery,
  })) as {
    data: FooterQueryResult | null;
  };

  return {
    footerCopyright: footer.data?.footerCopyright || null,
    socialMediaLinks: {
      title: footer.data?.socialMediaLinks?.title || '',
      items:
        footer.data?.socialMediaLinks?.items?.map((item) => ({
          media: item.media || '',
          link: linkResolver(item.link),
        })) || [],
    },
  };
};

export const getSeason = async (): Promise<Season> => {
  const season = await esorClient.getCurrentSeason();
  return season;
};
