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

export const calculateAge = (birthDate: string | undefined): string | null => {
  if (!birthDate) {
    console.error('Birth date is undefined');
    return null;
  }

  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

  if (!datePattern.test(birthDate)) {
    console.error(
      'Invalid date format. Expected format: dd.mm.yyyy, received:',
      birthDate
    );
    return null;
  }

  const [day, month, year] = birthDate.split('.').map(Number);

  const birth = new Date(year, month - 1, day);

  if (
    birth.getDate() !== day ||
    birth.getMonth() !== month - 1 ||
    birth.getFullYear() !== year
  ) {
    console.error('Invalid date:', birthDate);
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return `${age} lat`;
};
