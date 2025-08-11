import { getFooter } from '@/app/actions';

import { Sponsors } from './sponsors';
import { PortableText } from 'next-sanity';
import { Suspense } from 'react';

export const Footer = async () => {
  const footer = await getFooter();

  return (
    <footer className="bg-gray-950 p-4 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <Suspense>
          <Sponsors />
        </Suspense>
        <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-400 sm:text-center [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-gray-50 [&_a:hover]:underline">
            <PortableText value={footer.footerCopyright} />
          </div>
        </div>
      </div>
    </footer>
  );
};
