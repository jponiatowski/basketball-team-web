'use client';

import { NavigationItem } from '@/app/types';
import { ChevronDown } from 'lucide-react';
import { Collapsible } from 'radix-ui';
import { type FC } from 'react';
import Link from 'next/link';

interface HeaderMobileSubmenuProps {
  item: NavigationItem;
  onItemClick?: () => void;
}

export const HeaderMobileSubmenu: FC<HeaderMobileSubmenuProps> = ({
  item,
  onItemClick,
}) => {
  if (item.type === 'link') {
    return (
      <Link
        key={item.label}
        href={item.link?.url || ''}
        className="block w-full truncate p-4 text-white"
        onClick={onItemClick}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="flex w-full items-center justify-between p-4 text-white">
        <span>{item.label}</span>
        <ChevronDown />
      </Collapsible.Trigger>
      <Collapsible.Content className="collapsible-content bg-primary-700 ml-3 w-full p-2">
        {item.items?.map((subItem) => (
          <Link
            key={subItem.label}
            href={subItem.link?.url || ''}
            className="block w-full truncate p-3 text-white"
            onClick={onItemClick}
          >
            {subItem.label}
          </Link>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};


