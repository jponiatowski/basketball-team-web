import { getNavigation } from '@/app/actions';
import { cn } from '@/base/utils';
import Link from 'next/link';
import { HeaderDropdown } from './header-dropdown';
import { HeaderMobileMenu } from './header-mobile-menu';

export const Navigation = async () => {
  const navigation = await getNavigation();

  return (
    <>
      <HeaderMobileMenu items={navigation.items ?? []} />
      <div className="hidden w-full items-center justify-between lg:order-1 lg:mt-auto lg:flex lg:w-auto">
        <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
          {navigation.items?.map((item) => {
            if (item.type === 'subItems') {
              return (
                <li
                  key={item.label}
                  className={cn(
                    'block',
                    'border-b border-gray-100 py-2 pr-4 pl-3 lg:border-0 lg:p-0 lg:py-2',
                    'font-semibold text-gray-50 lg:border-0 lg:hover:text-gray-300',
                    'cursor-pointer hover:bg-gray-50 lg:hover:bg-transparent',
                    'transition-colors duration-300 ease-in-out'
                  )}
                >
                  <HeaderDropdown items={item.items ?? []}>
                    <span>{item.label}</span>
                  </HeaderDropdown>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.link?.url ?? ''}
                  target={item.link?.target}
                  className={cn(
                    'block',
                    'border-b border-gray-100 py-2 pr-4 pl-3 lg:border-0 lg:p-0 lg:py-2',
                    'font-semibold text-gray-50 lg:border-0 lg:hover:text-gray-300',
                    'hover:bg-gray-50 lg:hover:bg-transparent',
                    'transition-colors duration-300 ease-in-out'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
