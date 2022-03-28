import { FC } from 'react';
import { GetStaticProps } from 'next';

import Painting from '@/components/painting';
import { getAllPostsStaticProps } from '@/lib/api';
import Post from '@/types/post';

type Props = {
  allPosts: Post[];
};

const ID_LIMIT = 1000;

const Posts: FC<Props> = ({ allPosts }) => {
  const randomIdList = [...Array(ID_LIMIT)]
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);

  const postsWithRandomImage = allPosts.map((post, index) => {
    if (post.image) return post;

    return {
      ...post,
      image: `https://picsum.photos/id/${randomIdList[index]}/900/1200`,
    };
  });

  return (
    <section className='mx-auto mb-4 max-w-[1280px]'>
      <h2 className="posts-title my-4 font-['DiamorScript'] text-6xl">
        Articles
      </h2>
      <div className='posts grid gap-6 sm:grid-cols-2 2xl:grid-cols-3'>
        {postsWithRandomImage?.map((post, index) => {
          return (
            <div className='post__wrapper text-center' key={index}>
              <Painting src={post.image} />
              <div className='flex flex-col italic'>
                <span className='text-lg'>
                  {post.title} /{' '}
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>
                <span>{post.labels.join(', ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = getAllPostsStaticProps;
