import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { MdArticle } from 'react-icons/md';
import { SiAboutdotme } from 'react-icons/si';

import CuriNavbar from '@curi/components/Navbar';

const TABS = [
  { name: '文章清單', link: '/posts', icon: MdArticle },
  { name: '關於我', link: '/cv', icon: SiAboutdotme },
];

const SOCIAL_MEDIAS = [
  { icon: FiGithub, link: 'https://github.com/wlunareve' },
  {
    icon: FiLinkedin,
    link: 'https://www.linkedin.com/in/%E6%98%8E%E8%AC%99-%E5%AE%8B-982b30172/',
  },
];

const Navbar = () => (
  <CuriNavbar
    title='ToD'
    tabs={TABS}
    socialMedias={SOCIAL_MEDIAS}
    className='border-default-border bg-default-canvas'
  />
);

export default Navbar;
