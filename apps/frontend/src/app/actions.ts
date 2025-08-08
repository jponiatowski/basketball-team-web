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
  Sponsor,
  SponsorType,
} from './types';

export const getNavigation = async (): Promise<NavigationData> => {
  const navigation = (await sanityFetch({
    query: navigationQuery,
  })) as {
    data: NavigationQueryResult | null;
  };

  return {
    items: navigation.data?.items?.map((item) => ({
      label: item.label,
      type: item._type,
      link:
        item._type === 'link' && item.link
          ? linkResolver(item.link)
          : undefined,
      items:
        item._type === 'subItems'
          ? item.items?.map((subItem) => ({
              label: subItem.label,
              link:
                subItem._type === 'item' && subItem.link
                  ? linkResolver(subItem.link)
                  : undefined,
            }))
          : undefined,
    })),
  };
};

export const getHeader = async (): Promise<HeaderData> => {
  const header = (await sanityFetch({
    query: headerQuery,
  })) as {
    data: HeaderQueryResult | null;
  };
  console.log('header', header);
  return {
    logo: header.data?.logo?.asset?.url,
    title: header.data?.title,
  };
};

export const getSponsors = async (): Promise<Sponsor[]> => {
  const sponsors = (await sanityFetch({
    query: sponsorsQuery,
  })) as {
    data: SponsorsQueryResult | null;
  };
  return (
    sponsors.data?.map((sponsor) => ({
      type: sponsor.type as SponsorType,
      name: sponsor.name || '',
      link: linkResolver(sponsor?.link),
      image_white: imageResolver(sponsor.image_white),
      image_color: imageResolver(sponsor.image_color),
    })) || []
  );
};

export const getFooter = async (): Promise<FooterData> => {
  const footer = (await sanityFetch({
    query: footerQuery,
  })) as {
    data: FooterQueryResult | null;
  };

  return {
    logo: imageResolver(footer.data?.logo),
    items:
      footer.data?.items?.map((item) => ({
        title: item._type === 'link' ? item.title || '' : '',
        links:
          item._type === 'link' && item.links
            ? item.links.map((linkItem) => ({
                label: linkItem.label || '',
                link: linkResolver(linkItem.link),
              }))
            : [],
      })) || [],
  };
};
