import {
  SiCss3,
  SiD3Dotjs,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLeaflet,
  SiReact,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from 'react-icons/si';

export const FRONT_END_SKILLS = [
  {
    name: 'HTML',
    icon: {
      component: SiHtml5,
    },
  },
  {
    name: 'CSS/Scss',
    icon: {
      component: SiCss3,
      color: '#016CB4',
    },
  },
  {
    name: 'JavaScript',
    icon: {
      component: SiJavascript,
      color: '#efd81d',
    },
  },
  {
    name: 'TypeScript',
    icon: {
      component: SiTypescript,
      color: '#0074C2',
    },
  },
  {
    name: 'React',
    level: 2,
    icon: {
      component: SiReact,
      color: '#5BD0ED',
    },
  },
  {
    name: 'Vue',
    icon: {
      component: SiVuedotjs,
      color: '#00BB7C',
    },
  },
  {
    name: 'Jest',
    icon: {
      component: SiJest,
      color: '#944058',
    },
  },
  {
    name: 'D3.js',
    icon: {
      component: SiD3Dotjs,
      color: '#EF8648',
    },
  },
  {
    name: 'Leaflet',
    icon: {
      component: SiLeaflet,
      color: 'green',
    },
  },
];

export const TOOL_SKILLS = [
  {
    name: 'Git',
    icon: {
      component: SiGit,
      color: '#EB4D28',
    },
  },
  {
    name: 'Webpack',
    icon: {
      component: SiWebpack,
      color: '#1B74BA',
    },
  },
  {
    name: 'Vite',
    icon: {
      component: SiVite,
      color: '#F7C23B',
    },
  },
  {
    name: 'Docker',
    icon: {
      component: SiDocker,
      color: '#2391E6',
    },
  },
];
