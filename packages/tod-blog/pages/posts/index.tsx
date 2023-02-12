import { FC } from 'react';
import { useRouter } from 'next/router';

import Drawer, { Menu } from '@curi/components/Drawer';

import PostListItem from '@/containers/Post/ListItem';
import { getAllPosts } from '@/lib/api';
import Post from '@/types/post';

type Props = {
  allPosts: Post[];
};

const Posts: FC<Props> = ({ allPosts }) => {
  const router = useRouter();

  const menu: Menu[] = Object.values(
    allPosts
      .filter(post => post.title)
      .map(post => ({
        ...post,
        groupName: post.title.match(/^<(.*?)>/)?.[1],
      }))
      .reduce((accumulator, post) => {
        if (!post.groupName) {
          return accumulator;
        }

        if (accumulator[post.groupName]) {
          return {
            ...accumulator,
            [post.groupName]: {
              ...accumulator[post.groupName],
              children: [
                ...accumulator[post.groupName].children,
                {
                  value: post.slug,
                  text: post.title,
                },
              ],
            },
          };
        }

        return {
          ...accumulator,
          [post.groupName]: {
            text: post.groupName,
            children: [
              {
                text: post.title,
                value: post.slug,
              },
            ],
          },
        };
      }, {})
  );

  const handleClick = node => router.push(`/posts/${node.value}`);

  return (
    <>
      <Drawer
        nodes={menu}
        onClick={handleClick}
        className='cursor-pointer sm:w-[1280px]'
      />
      {/* <div className='posts mx-auto my-auto max-w-7xl'>
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
      </div> */}
    </>
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
    'image',
  ]);

  return {
    props: { allPosts },
  };
};
