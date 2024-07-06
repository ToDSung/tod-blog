import type Icon from '@/types/icon';

type SkillProps = {
  name: string;
  icon: Icon;
};

const Skill = ({ name, icon }: SkillProps) => (
  <div className='skill flex flex-col'>
    <div className='title flex flex-wrap items-center gap-2'>
      {icon.component && <icon.component color={icon.color} />}
      <h3 className={`title__name text-base`}>{name}</h3>
    </div>
  </div>
);

export default Skill;
