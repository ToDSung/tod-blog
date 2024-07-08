import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { MdArticle } from 'react-icons/md';
import { SiAboutdotme } from 'react-icons/si';

import NavbarComponent from '@/components/Navbar';

const TABS = [
  {
    name: '文章清單',
    link: 'https://tod-blog-docusaurus.vercel.app',
    icon: MdArticle,
  },
  { name: '關於我', link: '/cv', icon: SiAboutdotme },
];

const SOCIAL_MEDIAS = [
  { icon: FiGithub, link: 'https://github.com/ToDSung' },
  {
    icon: FiLinkedin,
    link: 'https://www.linkedin.com/in/tod-sung-982b30172/',
  },
];

const Navbar = () => (
  <NavbarComponent
    title='ToD'
    tabs={TABS}
    socialMedias={SOCIAL_MEDIAS}
    className='border-default-border bg-default-canvas'
  />
);

export default Navbar;
