'use client';

import type { NextPage } from 'next';

import EntryContent from './EntryContent';

const LandingPage: NextPage = () => {
  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main'>
        <EntryContent />
      </section>
    </main>
  );
};

export default LandingPage;
