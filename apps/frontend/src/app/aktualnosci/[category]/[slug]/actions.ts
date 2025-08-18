import { singlePostQuery } from '@/base/lib/sanity/queries';
import { sanityFetch } from '@/base/lib/sanity/live';
import { imageResolver } from '@/base/lib/sanity/utils';

export const getSinglePost = async (slug: string) => {
  const post = await sanityFetch({
    query: singlePostQuery,
    params: { slug },
  });

  return {
    title: post.data?.title,
    body: post.data?.body,
    cover: imageResolver(post.data?.mainImage),
    publishedAt: post.data?.publishedAt,
  };
};
