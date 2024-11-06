'use client';

import ButtonEmotion from '@curi/mui-with-linaria/ButtonEmotion';
import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import SwitchEmotion from '@curi/mui-with-linaria/SwitchEmotion';
import SwitchLinaria from '@curi/mui-with-linaria/SwitchLinaria';
import { css } from '@emotion/css';
import { css as cssReact } from '@emotion/react';
import { Button } from '@mui/material';
import type { NextPage } from 'next';

const cssButton = css`
  background-color: #16c0ba;
`;

const reactButton = cssReact`
  background-color: #16c0ba;
`;

const MuiWithLinaria: NextPage = () => {
  const handleClick = () => {
    console.log('!');
  };

  return (
    <main className='flex max-w-5xl items-center'>
      <section id='main' className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <Button
            variant='contained'
            className={cssButton}
            onClick={handleClick}
          >
            emotion css Button
          </Button>
          <Button variant='contained' css={reactButton} onClick={handleClick}>
            emotion react Button
          </Button>
        </div>
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
