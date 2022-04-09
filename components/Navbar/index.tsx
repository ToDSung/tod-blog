import React, { FC } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { GrArticle } from 'react-icons/gr';
import { SiAboutdotme } from 'react-icons/si';
import Link from 'next/link';

import ExternalLink from '../ExternalLink';

const TABS = [
  { name: '文章清單', link: '/posts', icon: GrArticle },
  { name: '關於我', link: '/cv', icon: SiAboutdotme },
];

const SOCIAL_MEDIAS = [
  { icon: FiGithub, link: 'https://github.com/wlunareve' },
  {
    icon: FiLinkedin,
    link: 'https://www.linkedin.com/in/%E6%98%8E%E8%AC%99-%E5%AE%8B-982b30172/',
  },
];

// beacuse nextjs Link component, use forwardRef.
// forwardRef may occur typescript error, so that define any type to the component.
const IconForLink: FC<any> = React.forwardRef(function IconForLink(props, ref) {
  return <>{props.children}</>;
});

const Navbar = () => {
  return (
    <>
      <nav className='nav fixed z-10 flex min-h-[3.25rem] w-screen justify-center border-b-2 bg-white'>
        <div className='nav__container flex w-[80vw] max-w-[1680px] flex-wrap items-center justify-between sm:flex-row'>
          <div className='flex flex-wrap'>
            <Link href='/' passHref>
              <span className='cursor-pointer text-2xl font-bold'>ToD</span>
            </Link>
            <div className='tab my-0 mx-4 hidden flex-1 items-center gap-4 text-xl sm:flex'>
              <div className='tab__items flex gap-4'>
                {TABS.map(({ name, link }) => (
                  <Link href={link} key={name} passHref>
                    <a className='tab__item cursor-pointer'>{name}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='nav__social-media items-cente flex gap-4'>
            {TABS.map((tab, index) => (
              <Link href={tab.link} key={index} passHref>
                <IconForLink>
                  <tab.icon className='block text-2xl sm:hidden' />
                </IconForLink>
              </Link>
            ))}
            {SOCIAL_MEDIAS.map((socialMedia, index) => (
              <ExternalLink href={socialMedia.link} key={index}>
                <socialMedia.icon className='text-2xl' />
              </ExternalLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
