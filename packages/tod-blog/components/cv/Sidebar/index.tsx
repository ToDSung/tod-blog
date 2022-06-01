import { FC } from 'react';

import type Icon from '@/types/icon';
import Skill from '../Skill';

type Props = {
  skills: {
    name: string;
    description?: string;
    level?: number;
    icon: Icon;
  }[];
};

const Sidebar: FC<Props> = ({ skills = [] }) => {
  const aboutContents = [
    '我是 Tod，是講究務實的人，總是渴望把一切事情的基本做好，追求寫出可複用，少技術債的程式碼。',
    '正嘗試著分享我的歷程，期待精進自己的同時也能幫到他人，希望自己能夠從小處開始分享，將自己的小小能量散發出去！',
  ];

  return (
    <aside
      id='cv-sidebar'
      className='cv-sidebar bg-sub-canvas flex flex-col items-center rounded px-8 text-white'
    >
      <span className='cv-sidebar__title mt-4 text-3xl sm:mt-8'>宋明謙</span>
      <span>Tod Sung</span>
      <span>前端工程師</span>
      <ul className='details mt-8 flex w-full list-disc flex-col items-start	'>
        <li>0975-871-937</li>
        <li>wlunareve@gmail.com</li>
        <li>中正大學 資訊管理學系</li>
      </ul>
      <div className='about my-4 flex flex-col gap-4'>
        {aboutContents.map((about, index) => (
          <p key={index} className='about__item text-left'>
            {about}
          </p>
        ))}
      </div>
      <div className='skills mb-4 flex flex-col self-start'>
        <span className='skills__title text-3xl'>skills</span>
        <div className='skills__content mt-4 grid grid-cols-2 gap-4'>
          {skills.map(({ name, icon }) => (
            <Skill key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
