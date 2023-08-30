import type { NextPage } from 'next';

import EntryContent from './EntryContent';

const LandingPage: NextPage = () => {
  return (
    <main className='main flex max-w-[48rem] items-center'>
      <section id='main' className='main'>
        <EntryContent />
      </section>
    </main>
  );
};

export default LandingPage;
