import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import { getAllPosts, getAllPostsStaticProps } from '@/lib/api';
import Post from '@/types/post';
import LandingPage from './landingPage';

type Props = {
  allPosts: Post[];
};

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <>
      <link
        rel='preload'
        href='/fonts/JasonHandwriting/JasonHandwriting1.ttf'
        as='font'
        crossOrigin=''
      />
      <link
        rel='preload'
        href='/fonts/DiamorScript/Diamor.ttf'
        as='font'
        crossOrigin=''
      />
      <LandingPage allPosts={allPosts} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = getAllPostsStaticProps;
