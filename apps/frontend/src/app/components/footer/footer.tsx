import { getFooter } from '@/app/actions';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@radix-ui/themes';

export const Footer = async () => {
  const footer = await getFooter();
  console.log('first');
  return (
    <footer className="bg-gray-950 p-4 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 hidden md:mb-0 lg:block">
            <Link href="/" className="flex max-w-64 items-center gap-4">
              <figure className="relative size-16 flex-shrink-0 lg:size-24">
                <Image
                  src={footer.logo.url}
                  alt={footer.title}
                  fill
                  sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 112px"
                  className="h-full w-auto object-contain"
                />
              </figure>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {footer.items.map((item) => (
              <div key={item.title}>
                <h2 className="mb-6 text-sm font-semibold text-gray-50 uppercase">
                  {item.title}
                </h2>
                <ul className="text-gray-400">
                  {item.links.map((link) => (
                    <li className="mb-4">
                      <Link
                        href={link.link.url}
                        className="ml-2 transition-colors duration-300 ease-in-out hover:text-gray-50 hover:underline"
                        target={link.link.target}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2025{' '}
            <Link
              href="/"
              className="transition-colors duration-300 ease-in-out hover:text-gray-50 hover:underline"
            >
              Exact Forestall Śląsk Wrocław
            </Link>
            . Wszelkie prawa zastrzeżone.
          </span>
        </div>
      </div>
    </footer>
  );
};
