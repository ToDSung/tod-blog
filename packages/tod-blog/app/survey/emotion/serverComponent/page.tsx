import { css } from '@emotion/css';
import type { NextPage } from 'next';

const red = css`
  color: red;
  font-size: 24px;
`;

const blue = css`
  color: blue;
  font-size: 24px;
`;

const LandingPage: NextPage = () => {
  return (
    <main className='flex max-w-5xl flex-col gap-3'>
      <div>Emotion Server Component</div>
      <div className={red}>red</div>
      <div className={blue}>blue</div>
    </main>
  );
};

export default LandingPage;
