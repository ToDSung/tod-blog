'use client';

import ButtonEmotion from '@curi/mui-with-linaria/ButtonEmotion';
import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import SwitchEmotion from '@curi/mui-with-linaria/SwitchEmotion';
import SwitchLinaria from '@curi/mui-with-linaria/SwitchLinaria';

import type { NextPage } from 'next';

const MuiWithLinaria: NextPage = () => {
  const handleClick = () => {
    console.log('!');
  };

  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main' className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <ButtonEmotion variant='contained' onClick={handleClick}>
            Click Emotion Button!
          </ButtonEmotion>
          <SwitchEmotion>Switch Emotion Label</SwitchEmotion>
          <SwitchEmotion disabled defaultChecked>
            Switch Emotion Label
          </SwitchEmotion>
        </div>
        <div className='flex flex-col gap-4'>
          <ButtonLinaria variant='contained' onClick={handleClick}>
            Click Linaria Button!
          </ButtonLinaria>
          <SwitchLinaria>Switch Linaria Label</SwitchLinaria>
          <SwitchLinaria disabled defaultChecked>
            Switch Linaria Label
          </SwitchLinaria>
        </div>
      </section>
    </main>
  );
};

export default MuiWithLinaria;
