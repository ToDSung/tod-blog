import { FC } from 'react';

import UnorderedList from '@/components/List/UnorderedList';
import Paragraph from '@/components/Paragrath';
import type Icon from '@/types/icon';
import Skill from './Skill';

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
    '我是 Tod，是講究務實的人，總是渴望能找到問題的本質與答案的價值，追求於開發別具意義的產品。',
    '正嘗試著分享我的歷程，期待精進自己的同時也能幫到他人，希望自己能夠從小處開始分享，將自己的小小能量散發出去！',
  ];

  return (
    <aside
      id='cv-sidebar'
      className='cv-sidebar bg-sub-canvas flex flex-col items-start rounded px-4 pt-2 text-white md:items-center md:px-8'
    >
      <span className='cv-sidebar__title text-3xl'>宋明謙</span>
      <span className='leading-7'>Tod Sung</span>
      <span className='leading-7'>前端工程師</span>
      <div className='md:w-full'>
        <UnorderedList
          items={[
            '0975-871-937',
            'wlunareve@gmail.com',
            '中正大學 資訊管理學系',
          ]}
        />
      </div>
      <div className='about my-1 flex flex-col gap-2'>
        {aboutContents.map((about, index) => (
          <Paragraph key={index} className='about__item'>
            {about}
          </Paragraph>
        ))}
      </div>
      <div className='skills flex flex-col'>
        <span className='skills__title text-3xl'>skills</span>
        <div className='skills__content mt-4 grid grid-cols-2 gap-2'>
          {skills.map(({ name, icon }) => (
            <Skill key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
