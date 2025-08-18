import { Skeleton, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { Suspense } from 'react';
import { GameCard, Image, YouTubeVideo } from './blocks';
import { BlockContent } from '@/base/lib/sanity/types';

interface BlockEditorProps {
  body: BlockContent;
}

export const BlockEditor = ({ body }: BlockEditorProps) => {
  return (
    <div className="text-wrap-pretty flex flex-col gap-4 text-gray-900">
      <PortableText
        components={{
          block: {
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            h5: ({ children }) => <h5>{children}</h5>,
            h6: ({ children }) => <h6>{children}</h6>,
            normal: ({ children }) => <Text as="p">{children}</Text>,
          },
          types: {
            esorGame: ({ value }) => (
              <Suspense
                fallback={
                  <Skeleton
                    width="100%"
                    maxWidth={{ md: '672px' }}
                    height={{ initial: '242px', md: '184px' }}
                    className="!mx-auto !my-4"
                  />
                }
              >
                <GameCard {...value} />
              </Suspense>
            ),
            youtube: ({ value }) => <YouTubeVideo value={value} />,
            imageBlock: ({ value }) => (
              <Image
                src={value.file.asset.url}
                alt={value.alt}
                width={value.file.asset?.dimensions?.width}
                height={value.file.asset?.dimensions?.height}
                caption={value.caption}
                placeholder={value.file.asset?.lqip}
              />
            ),
          },
          marks: {
            link: ({ children, value }) => (
              <Link
                target="_blank"
                href={value.href}
                className="text-primary-600 font-semibold hover:!underline"
              >
                {children}
              </Link>
            ),
          },
        }}
        value={body}
      />
    </div>
  );
};
