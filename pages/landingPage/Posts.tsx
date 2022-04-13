import { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import Painting from '@/components/painting';
import useLoading from '@/contexts/loading';
import { getAllPostsStaticProps } from '@/lib/api';
import { getRandomImageUrl } from '@/lib/image';
import Post from '@/types/post';

type Props = {
  allPosts: Post[];
};

const Posts: FC<Props> = ({ allPosts }) => {
  const { setLoading } = useLoading();
  const handlePaintingLoaded = () => {
    setLoading(false);
  };

  const postsWithRandomImage = allPosts.map((post, index) => {
    if (post.image) return post;

    return {
      ...post,
      image: getRandomImageUrl(index),
    };
  });

  return (
    <section className='mx-auto mb-4 max-w-[1280px]'>
      <h2 className="posts-title my-4 font-['DiamorScript'] text-6xl">
        Articles
      </h2>
      <div className='posts grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {postsWithRandomImage?.map((post, index) => {
          return (
            <Link href={`/posts/${post.slug}`} passHref key={index}>
              <div className='post__wrapper cursor-pointer text-center'>
                <div className=' aspect-w-16 aspect-h-9 mb-4 rounded-lg ring-gray-800 transition hover:ring-4 xl:aspect-h-4 xl:aspect-w-3 '>
                  <Painting
                    src={post.image}
                    onLoadingComplete={
                      index === 0 ? handlePaintingLoaded : () => {}
                    }
                  />
                </div>
                <div className='flex flex-col italic'>
                  <div className='flex flex-wrap justify-center text-lg'>
                    <span>{post.title} </span>
                    <span dangerouslySetInnerHTML={{ __html: '&nbsp/&nbsp' }} />
                    <span>
                      {new Date(post.date).toISOString().slice(0, 10)}
                    </span>
                  </div>
                  <span>{post.labels.join(', ')}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = getAllPostsStaticProps;
