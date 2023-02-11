import { FC } from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import { join } from 'path';

import Painting from '@curi/components/Painting';

import MarkdownDetail from '@/containers/Post/MarkdownDetail';
import { getAllPosts, getPostByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
  post: {
    slug?: string;
    title: string;
    excerpt: string;
    image: string;
    content: string;
  };
};

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return router.isFallback ? (
    <></>
  ) : (
    <>
      <article className='mx-auto mt-4 mb-8 max-w-3xl'>
        {post.image && (
          <div className='aspect-h-9 aspect-w-16 mb-4'>
            <Painting src={post.image} />
          </div>
        )}
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
  const path = join(...params.slug) + '.md';
  const post = getPostByPath(path, [
    'title',
    'excerpt',
    'image',
    'date',
    'slug',
    'author',
    'content',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      ...(post.title && {
        head: {
          title: post.title,
          description: post.excerpt ?? null,
        },
      }),
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
