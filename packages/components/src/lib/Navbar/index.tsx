import { IconType } from 'react-icons';

interface IconLink {
  link: string;
  icon: IconType;
}

interface Tab extends IconLink {
  name: string;
}

type Props = {
  title: string;
  tabs: Tab[];
  socialMedias: IconLink[];
  className?: string;
};

const MainSide = ({ title, tabs }: { title: string; tabs: Tab[] }) => (
  <div className='flex flex-wrap items-center gap-6'>
    <a href='/'>
      <h1 className='title cursor-pointer text-2xl font-bold'>{title}</h1>
    </a>
    <div className='tabs my-0 hidden text-xl sm:flex'>
      <div className='tabs__items flex gap-4'>
        {tabs.map(({ name, link }) => (
          <a href={link} key={name} className='tab__item cursor-pointer'>
            {name}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const IconSide = ({
  tabs,
  socialMedias,
}: {
  tabs: Tab[];
  socialMedias: IconLink[];
}) => (
  <div className='nav__icon flex gap-4'>
    {tabs.map(({ link, icon: Icon }) => (
      <a href={link} key={link}>
        <Icon className='block text-2xl sm:hidden' />
      </a>
    ))}
    {socialMedias.map(({ link, icon: Icon }) => (
      <a href={link} key={link} target='_blank' rel='noopener noreferrer'>
        <Icon className='text-2xl' />
      </a>
    ))}
  </div>
);

const Navbar = ({
  title,
  tabs = [],
  socialMedias = [],
  className = '',
}: Props) => {
  return (
    <>
      <nav
        className={`
        nav fixed z-10 flex min-h-[3.25rem] w-screen justify-center border-b-2 ${className}
      `}
      >
        <div className='nav__container flex w-[80vw] max-w-[1280px] flex-wrap items-center justify-between sm:flex-row'>
          <MainSide title={title} tabs={tabs} />
          <IconSide tabs={tabs} socialMedias={socialMedias} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
