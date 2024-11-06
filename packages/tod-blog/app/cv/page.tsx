'use client';

import { FRONT_END_SKILLS, TOOL_SKILLS } from './constants';
import Content from './Content';
import Sidebar from './Sidebar';

const cv = () => (
  <div
    id='cv'
    className='my-4 grid max-w-screen-xl overflow-hidden md:h-[calc(100vh-5.25rem)] md:grid-cols-[20rem_1fr]'
  >
    <Sidebar skills={[...FRONT_END_SKILLS, ...TOOL_SKILLS]} />
    <Content />
  </div>
);

export default cv;
