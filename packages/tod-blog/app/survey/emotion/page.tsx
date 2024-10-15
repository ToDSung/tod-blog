'use client';

import { css } from '@emotion/react';
import type { NextPage } from 'next';

const red = css`
  color: red;
  font-size: 36px;
`;

const blue = css`
  color: blue;
  font-size: 36px;
`;

const LandingPage: NextPage = () => {
  console.log(red);
  return (
    <main className='flex max-w-5xl flex-col gap-3'>
      <div>Emotion Survey Page</div>
      <div css={red}>red</div>
      <div css={blue}>blue</div>
    </main>
  );
};

export default LandingPage;
