import { Image, Link } from '@/base/types';

export interface NavigationLink {
  url: string | undefined;
  target: string;
}

export interface NavigationSubItem {
  label: string | null;
  link?: NavigationLink;
}

export interface NavigationItem {
  label: string | null;
  type: string;
  link?: NavigationLink;
  items?: NavigationSubItem[];
}

export interface NavigationData {
  items?: NavigationItem[];
}

export interface HeaderData {
  logo?: string | null;
  title?: string | null;
}

export type SponsorType = 'strategic' | 'title' | 'partner';

export interface Sponsor {
  type: SponsorType;
  name: string;
  link: Link;
  image: Image;
}

export interface SponsorsData {
  strategicSponsors?: Sponsor[];
  titleSponsors?: Sponsor[];
  partnerSponsors?: Sponsor[];
}

export interface SocialMediaItem {
  media: string;
  link: Link;
}

export interface SocialMediaLinks {
  title: string;
  items: SocialMediaItem[];
}

export interface FooterData {
  footerCopyright: any; // blockContent from Sanity
  socialMediaLinks: SocialMediaLinks;
}
