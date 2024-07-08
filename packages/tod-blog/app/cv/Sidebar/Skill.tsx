import type Icon from '@/types/icon';

interface SkillProps {
  name: string;
  icon: Icon;
}

const Skill = ({ name, icon }: SkillProps) => (
  <div className='flex flex-col'>
    <div className='flex flex-wrap items-center gap-2'>
      {icon.component && <icon.component color={icon.color} />}
      <h3 className='text-base'>{name}</h3>
    </div>
  </div>
);

export default Skill;
