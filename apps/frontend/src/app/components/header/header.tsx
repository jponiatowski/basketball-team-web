import { getNavigation } from '@/app/actions';
import { Navigation } from './navigation';
import { Suspense } from 'react';
import { Menu } from 'lucide-react';
import { HeaderLogo } from './header-logo';
import { HeaderTrophies } from './header-trophies';

export const Header = async () => {
  return (
    <header>
      <nav className="bg-primary-600 border-gray-200 px-4 py-1.5 lg:px-6 lg:py-4">
        <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <HeaderTrophies goldMedals={17} silverMedals={18} bronzeMedals={11} />
          <HeaderLogo />
          <Suspense
            fallback={
              <div className="flex h-10 w-10 items-center justify-center lg:h-9">
                <Menu className="text-white lg:hidden" />
              </div>
            }
          >
            <Navigation />
          </Suspense>
        </div>
      </nav>
    </header>
  );
};
