import Link from 'next/link';
import { IconType } from 'react-icons';
import ExternalLink from '../ExternalLink';

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
    <Link href='/' passHref>
      <h1 className='title cursor-pointer text-2xl font-bold'>{title}</h1>
    </Link>
    <div className='tabs my-0 hidden text-xl sm:flex'>
      <div className='tabs__items flex gap-4'>
        {tabs.map(({ name, link }) => (
          <Link href={link} key={name} passHref>
            <a className='tab__item cursor-pointer'>{name}</a>
          </Link>
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
      <Link href={link} key={link} passHref>
        <a>
          <Icon className='block text-2xl sm:hidden' />
        </a>
      </Link>
    ))}
    {socialMedias.map(({ link, icon: Icon }) => (
      <ExternalLink href={link} key={link}>
        <Icon className='text-2xl' />
      </ExternalLink>
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
