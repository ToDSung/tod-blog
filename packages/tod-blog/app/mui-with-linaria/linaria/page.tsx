'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import SwitchLinaria from '@curi/mui-with-linaria/SwitchLinaria';
import type { NextPage } from 'next';

import usePerformance from '../hooks/usePerformance';

const MuiWithLinaria: NextPage = () => {
  const handleClick = () => {
    console.log('!');
  };

  usePerformance('Linaria');

  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main' className='flex gap-8'>
        {Array.from({ length: 50 }).map((_, index) => (
          <>
            <div className='flex flex-col gap-4' key={index}>
              <ButtonLinaria variant='contained' onClick={handleClick}>
                Click Linaria Button!
              </ButtonLinaria>
              <SwitchLinaria>Switch Linaria Label</SwitchLinaria>
              <SwitchLinaria disabled defaultChecked>
                Switch Linaria Label
              </SwitchLinaria>
            </div>
          </>
        ))}
      </section>
    </main>
  );
};

export default MuiWithLinaria;
