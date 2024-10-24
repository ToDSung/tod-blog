'use client';

import { Button } from '@curi/mui-with-linaria';
import type { NextPage } from 'next';

const MuiWithLinaria: NextPage = () => {
  const handleClick = () => {
    console.log('!');
  };

  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main'>
        <Button variant='contained' onClick={handleClick}>
          Click Me!
        </Button>
      </section>
    </main>
  );
};

export default MuiWithLinaria;
