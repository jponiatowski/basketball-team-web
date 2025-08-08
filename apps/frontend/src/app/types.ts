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
  image_white: Image;
  image_color: Image;
}

export interface FooterLink {
  label: string;
  link: Link;
}

export interface FooterItem {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  title: string;
  logo: Image;
  items: FooterItem[];
}
