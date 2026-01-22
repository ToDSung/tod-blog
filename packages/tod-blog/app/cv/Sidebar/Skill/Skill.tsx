import type Icon from '@/types/icon';

import Typography from '../../../components/Typography';

interface SkillProps {
  name: string;
  icon: Icon;
}

const Skill = ({ name, icon }: SkillProps) => (
  <div className='flex flex-wrap items-center gap-2'>
    {icon.component && <icon.component color={icon.color} />}
    <Typography variant='body-md'>{name}</Typography>
  </div>
);

export default Skill;
