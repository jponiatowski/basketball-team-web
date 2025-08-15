import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: (string | undefined | any)[]) => {
  return twMerge(clsx(...classes));
};

export const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
