'use client';

import { NavigationItem } from '@/app/types';
import { Flex } from '@radix-ui/themes';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Collapsible } from 'radix-ui';
import { type FC, useState } from 'react';
import { useScrollLock } from 'usehooks-ts';
import Link from 'next/link';

interface HeaderMobileMenuProps {
  items: NavigationItem[];
}

export const HeaderMobileMenu: FC<HeaderMobileMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    unlock();
  };

  const handleOpen = () => {
    setOpen(true);
    lock();
  };

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={handleOpenChange}
      className="block lg:hidden"
    >
      <Collapsible.Trigger
        className="menu-icon-transition flex h-10 w-10 items-center justify-center text-white"
        data-open={open}
      >
        {open ? <X size={32} /> : <Menu size={32} />}
      </Collapsible.Trigger>

      <Collapsible.Content className="collapsible-content bg-primary-700 fixed top-[76px] left-0 z-50 h-full w-full overflow-y-auto font-medium">
        <div className="p-6">
          {items.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  href={item.link?.url || ''}
                  className="block w-full truncate p-4 text-white"
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Collapsible.Root>
                <Collapsible.Trigger className="group flex w-full items-center justify-between p-4 text-white">
                  <span>{item.label}</span>
                  <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                </Collapsible.Trigger>
                <Collapsible.Content className="collapsible-content bg-primary-700 ml-3 w-full p-2">
                  {item.items?.map((subItem) => {
                    if (subItem.type === 'subItems') {
                      return (
                        <Collapsible.Root>
                          <Collapsible.Trigger className="group flex w-full items-center justify-between p-3 text-white">
                            <span>{subItem.label}</span>
                            <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                          </Collapsible.Trigger>
                          <Collapsible.Content className="collapsible-content bg-primary-700 ml-3 w-full p-2">
                            {subItem.items?.map((subSubItem) => {
                              return (
                                <Link
                                  key={subSubItem.label}
                                  href={subSubItem.link?.url || ''}
                                  className="block w-full truncate p-3 text-white"
                                  onClick={handleClose}
                                >
                                  {subSubItem.label}
                                </Link>
                              );
                            })}
                          </Collapsible.Content>
                        </Collapsible.Root>
                      );
                    }

                    return (
                      <Link
                        key={subItem.label}
                        href={subItem.link?.url || ''}
                        className="block w-full truncate p-3 text-white"
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </Collapsible.Content>
              </Collapsible.Root>
            );
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
