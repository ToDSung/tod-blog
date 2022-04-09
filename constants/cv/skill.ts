import {
  SiCss3,
  SiD3Dotjs,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLeaflet,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from 'react-icons/si';

export const FRONT_END_SKILLS = [
  {
    name: 'HTML',
    description: '努力套用 Semantic HTML 於平常撰寫上',
    level: 2,
    icon: {
      component: SiHtml5,
    },
  },
  {
    name: 'JavaScript',
    description:
      '熟悉 ES6+ 語法，能適當撰寫可複用程式碼，目前正學習 Funtional Programming',
    level: 3,
    icon: {
      component: SiJavascript,
      color: '#efd81d',
    },
  },
  {
    name: 'CSS/Scss',
    description:
      '使用 BEM 命名，能適當切割元件，也嘗試於使用 Utility base 的方式開發',
    level: 2,
    icon: {
      component: SiCss3,
      color: '#016CB4',
    },
  },
  {
    name: 'Vue',
    description:
      '專案經驗以 Vue2 為主，目前在 Side Project 使用 composition API 作為練習',
    level: 2,
    icon: {
      component: SiVuedotjs,
      color: '#00BB7C',
    },
  },
  {
    name: 'Leaflet',
    description:
      '搭配 openStreetMap，介接 geoJson 達成台灣各地區資料展現、互動',
    level: 2,
    icon: {
      component: SiLeaflet,
      color: 'green',
    },
  },
  {
    name: 'D3.js',
    description:
      '能將資料繪製成柱狀、線狀圖，提供資料視覺化表現，也試著想多寫一些可複用元件',
    level: 2,
    icon: {
      component: SiD3Dotjs,
      color: '#EF8648',
    },
  },
  {
    name: 'Jest',
    description: '使用過 jest, @vue/unit-jest 進行單元測試',
    level: 1,
    icon: {
      component: SiJest,
      color: '#944058',
    },
  },
];

export const TOOL_SKILLS = [
  {
    name: 'Git',
    description:
      '具備基本指令操作能力，能應用 semantic commit 進行版控，閱讀過 flow 的相關文章',
    level: 2,
    icon: {
      component: SiGit,
      color: '#EB4D28',
    },
  },
  {
    name: 'Webpack',
    description: '具有前端網站 config 調整經驗，能獨立完成套件跨版本更新工作',
    level: 2,
    icon: {
      component: SiWebpack,
      color: '#1B74BA',
    },
  },
  {
    name: 'Vite',
    description: '將小組打包工具轉換為 vite ，增進工作效率',
    level: 1,
    icon: {
      component: SiVite,
      color: '#F7C23B',
    },
  },
  {
    name: 'Docker',
    description: '具備基本指令操作能力 能夠撰寫 compose',
    level: 2,
    icon: {
      component: SiDocker,
      color: '#2391E6',
    },
  },
];
