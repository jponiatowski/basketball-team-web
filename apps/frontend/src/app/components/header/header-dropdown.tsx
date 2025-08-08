'use client';

import { cn } from '@/base/utils';
import { DropdownMenu, Flex, Link } from '@radix-ui/themes';
import { FC, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavigationSubItem } from '@/app/types';

interface HeaderDropdownProps {
  children: React.ReactNode;
  items: NavigationSubItem[];
}

export const HeaderDropdown: FC<HeaderDropdownProps> = ({
  children,
  items,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <Flex align="center" gap="2">
          {children}
          <ChevronDown
            className={cn(
              'h-4 w-4',
              'transition-transform duration-300 ease-in-out',
              {
                'rotate-180': open,
              }
            )}
          />
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        side="bottom"
        align="center"
        sideOffset={16}
        color="gray"
        variant="soft"
      >
        {items.map((item) => {
          if (!item.link) {
            return null;
          }

          return (
            <DropdownMenu.Item
              key={item.label}
              className="w-32 max-w-40 hover:bg-gray-100"
            >
              <Link
                href={item.link.url}
                target={item.link.target}
                className={cn(
                  'truncate !text-gray-900 hover:text-gray-100',
                  '!w-full'
                )}
              >
                {item.label}
              </Link>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
