import Content from '@/components/cv/Content';
import Sidebar from '@/components/cv/Sidebar';
import { FRONT_END_SKILLS, TOOL_SKILLS } from '@/constants/cv/skill';

const cv = () => (
  <div
    id='cv'
    className='cv grid max-w-[1280px] overflow-hidden md:h-[calc(100vh-3.25rem)] md:grid-cols-[20rem_1fr]'
  >
    <Sidebar skills={[...FRONT_END_SKILLS, ...TOOL_SKILLS]} />
    <Content />
  </div>
);

export default cv;
