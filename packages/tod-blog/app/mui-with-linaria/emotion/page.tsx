'use client';

import ButtonEmotion from '@curi/mui-with-linaria/ButtonEmotion';
import SwitchEmotion from '@curi/mui-with-linaria/SwitchEmotion';

import type { NextPage } from 'next';

import usePerformance from '../hooks/usePerformance';

const MuiWithLinaria: NextPage = () => {
  const handleClick = () => {
    console.log('!');
  };

  usePerformance('Emotion');

  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main' className='flex gap-8'>
        {Array.from({ length: 50 }).map((_, index) => (
          <>
            <div className='flex flex-col gap-4' key={index}>
              <ButtonEmotion variant='contained' onClick={handleClick}>
                Click Emotion Button!
              </ButtonEmotion>
              <SwitchEmotion>Switch Emotion Label</SwitchEmotion>
              <SwitchEmotion disabled defaultChecked>
                Switch Emotion Label
              </SwitchEmotion>
            </div>
          </>
        ))}
      </section>
    </main>
  );
};

export default MuiWithLinaria;
