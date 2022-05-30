import { FC } from 'react';

import PostListItem from '@/components/Post/ListItem';
import { getAllPosts } from '@/lib/api';
import Post from '@/types/post';

type Props = {
  allPosts: Post[];
};

const Posts: FC<Props> = ({ allPosts }) => {
  return (
    <div className='posts mx-auto my-auto max-w-7xl'>
      {allPosts
        .filter(({ title }) => title)
        .map((post, idx) => (
          <PostListItem
            key={post.title}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            labels={post.labels}
            date={post.date}
          />
        ))}
    </div>
  );
};

export default Posts;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'labels',
  ]);

  return {
    props: { allPosts },
  };
};
