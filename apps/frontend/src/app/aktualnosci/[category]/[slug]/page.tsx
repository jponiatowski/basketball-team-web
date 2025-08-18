import { Breadcrumbs } from '@/base/components/breadcrumbs';
import { Card } from '@radix-ui/themes';
import { getSinglePost } from './actions';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Image from 'next/image';
import { cn } from '@/base/utils';

import { BlockEditor } from '@/base/components/block-editor';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  return (
    <>
      <div className="flex gap-8">
        <article className="w-3xl flex-shrink overflow-hidden">
          <Breadcrumbs
            className="truncate"
            items={[
              { label: 'Strona główna', href: '/' },
              { label: 'Aktualności', href: '/aktualnosci' },
              {
                label: 'Podsumowanie tygodnia',
                href: '/aktualnosci/podsumowanie-tygodnia',
              },
              {
                label: post.title ?? 'Aktualność',
                current: true,
              },
            ]}
          />
          <header className="mb-4 lg:mb-6">
            <div className="my-4 flex items-center md:my-6">
              <a
                href="#"
                className="bg-primary-100 text-primary-800 hover:bg-primary-200 mr-3 rounded px-2.5 py-0.5 text-sm font-medium"
              >
                Technology
              </a>
              <a
                href="#"
                className="bg-primary-100 text-primary-800 hover:bg-primary-200 mr-3 rounded px-2.5 py-0.5 text-sm font-medium"
              >
                Design
              </a>
              <a
                href="#"
                className="bg-primary-100 text-primary-800 hover:bg-primary-200 mr-3 rounded px-2.5 py-0.5 text-sm font-medium"
              >
                Programming
              </a>
            </div>
            <h1 className="mb-4 lg:mb-6">{post.title}</h1>
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
              <div className="mr-4 text-sm">
                Opublikowano{' '}
                {format(new Date(post.publishedAt), 'dd.MM.yyyy HH:mm', {
                  locale: pl,
                })}
              </div>
            </div>
          </header>
          <figure className="relative mb-6 aspect-[16/9] w-full rounded-lg">
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              className="rounded-lg object-cover object-center"
              placeholder="blur"
              blurDataURL={post.cover.placeholder}
            />
          </figure>
          <BlockEditor body={post.body} />
        </article>
        <aside
          className={cn(
            'flex-shrink-0',
            'sticky top-10',
            'h-fit',
            'hidden lg:block'
          )}
        >
          <Card className="!w-full">Najnowsze artykuły</Card>
        </aside>
      </div>
    </>
  );
}
