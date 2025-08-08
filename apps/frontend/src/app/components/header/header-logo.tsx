import { getHeader } from '@/app/actions';
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';

export const HeaderLogo = async () => {
  const header = await getHeader();

  return (
    <Flex gap="4" align="center">
      {header.logo && (
        <figure className="relative size-16 lg:size-24 xl:size-28">
          <Image
            src={header.logo}
            alt="logo"
            fill
            sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 112px"
          />
        </figure>
      )}
      <span className="font-heading hidden text-2xl font-semibold text-white xl:block">
        {header.title?.split(' ').map((word, index) => (
          <span className="block" key={index}>
            {word}
          </span>
        ))}
      </span>
    </Flex>
  );
};
