import type { NextPage } from 'next';

import { getAllPosts } from '@/lib/api';
import Post from '@/types/post';
import EntryContent from './EntryContent';
// import Guide from './Guide';
import Posts from './Posts';

type Props = {
  allPosts: Post[];
};

const LandingPage: NextPage<Props> = ({ allPosts }) => {
  return (
    <main className='main'>
      <section id='main' className='main'>
        <EntryContent />
        <Posts allPosts={allPosts} />
        {/* <Guide /> */}
      </section>
    </main>
  );
};

export default LandingPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'image',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'labels',
  ]).slice(0, 6);

  return {
    props: { allPosts },
  };
};
