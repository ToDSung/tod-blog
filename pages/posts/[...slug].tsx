import { FC } from 'react';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { join } from 'path';

import Painting from '@/components/painting';
import MarkdownDetail from '@/components/Post/MarkdownDetail';
import useLoading from '@/contexts/loading';
import { getAllPosts, getPostByPath, POSTS_ROOT_NAME } from '@/lib/api';
import { getRandomImageUrl } from '@/lib/image';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
  post: {
    slug?: string;
    image: string;
    title: string;
    content: string;
  };
};

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();

  const { handleLoadingStart } = useLoading();
  const handleLoadingFinish = handleLoadingStart();
  const handlePaintingLoaded = () => handleLoadingFinish();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return router.isFallback ? (
    // <PostTitle>Loading…</PostTitle>
    <></>
  ) : (
    <>
      <article className='mx-auto mt-4 mb-8 max-w-5xl'>
        <Head>
          <title>{post.title}</title>
        </Head>
        <div className='aspect-h-9 aspect-w-16 mb-4'>
          <Painting
            src={post.image ?? getRandomImageUrl(0)}
            onLoadingComplete={handlePaintingLoaded}
          />
        </div>
        <MarkdownDetail content={post.content} />
      </article>
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string[];
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const path = join(POSTS_ROOT_NAME, ...params.slug) + '.md';
  const post = getPostByPath(path, [
    'title',
    'image',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug.split('/'),
        },
      };
    }),
    fallback: false,
  };
};
