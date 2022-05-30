import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import { getAllPostsStaticProps } from '@/lib/api';
import Post from '@/types/post';
import LandingPage from './landingPage';

type Props = {
  allPosts: Post[];
};

const Home: NextPage<Props> = ({ allPosts }) => {
  return <LandingPage allPosts={allPosts} />;
};

export default Home;

export const getStaticProps: GetStaticProps = getAllPostsStaticProps;
