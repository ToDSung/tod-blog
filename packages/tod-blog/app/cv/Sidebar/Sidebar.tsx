import Paragraph from '@/app/cv/components/Paragraph';
import UnorderedList from '@/app/cv/components/UnorderedList';
import type Icon from '@/types/icon';

import Skill from './Skill';

type SidebarProps = {
  skills: {
    name: string;
    description?: string;
    level?: number;
    icon: Icon;
  }[];
};

const Sidebar = ({ skills = [] }: SidebarProps) => {
  const aboutContents = [
    '我是 Tod，是嚴謹實際的人，專注於產出的每一個細節，重視成果的實際體現。',
    '正嘗試著分享我的歷程，期待精進自己的同時也能幫到他人，希望自己能夠從小處開始分享，將自己的小小能量散發出去！',
  ];

  return (
    <aside
      id='cv-sidebar'
      className='bg-sub-canvas flex flex-col items-start rounded px-4 pt-2 text-white md:items-center md:px-8'
    >
      <span className='text-3xl'>宋明謙</span>
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
      <div className='my-1 flex flex-col gap-2'>
        {aboutContents.map((about, index) => (
          <Paragraph key={index}>{about}</Paragraph>
        ))}
      </div>
      <div className='flex flex-col'>
        <span className='text-3xl'>skills</span>
        <div className='mt-4 grid grid-cols-2 gap-2'>
          {skills.map(({ name, icon }) => (
            <Skill key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
