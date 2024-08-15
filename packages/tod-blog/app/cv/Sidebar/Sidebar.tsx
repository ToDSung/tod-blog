import type Icon from '@/types/icon';

import Typography from '../../../components/Typography';

import Skill from './Skill';

interface SidebarProps {
  skills: {
    name: string;
    description?: string;
    level?: number;
    icon: Icon;
  }[];
}

const Sidebar = ({ skills = [] }: SidebarProps) => {
  return (
    <aside
      id='cv-sidebar'
      className='bg-sub-canvas flex flex-col items-start gap-4 rounded px-4 py-2 text-white md:px-8'
    >
      <div className='flex flex-col'>
        <Typography variant='h3'>宋明謙 Tod Sung</Typography>
        <Typography variant='h6'>前端工程師</Typography>
      </div>
      <div className='flex flex-col md:w-full'>
        <Typography variant='subtitle-md'>
          0975-871-937 wlunareve@gmail.com
        </Typography>
        <Typography variant='subtitle-md'>中正大學 資訊管理學系</Typography>
      </div>
      <div className='flex flex-col gap-2'>
        <Typography variant='body-md'>
          我是 Tod，是嚴謹實際的人，專注於產出的每一個細節，重視成果的實際體現。
        </Typography>
        <Typography variant='body-md'>
          正嘗試著分享我的歷程，期待精進自己的同時也能幫到他人，希望自己能夠從小處開始分享，將自己的小小能量散發出去！
        </Typography>
      </div>
      <div className='flex w-full flex-col'>
        <Typography variant='h4'>skills</Typography>
        <div className='mt-2 grid grid-cols-2 gap-2'>
          {skills.map(({ name, icon }) => (
            <Skill key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
