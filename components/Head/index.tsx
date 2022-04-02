import { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
};

const HtmlHead: FC<Props> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta charSet='UTF-8' />
    <meta
      name='description'
      content='I am ToD 努力嘗試分享的小小前端，希望這邊有任何一篇文章能夠幫助到你！'
    />
    <meta name='author' content='Tod Sung' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={title} />
    <meta property='og:url' content='https://tod-blog-wlunareve.vercel.app/' />
    <meta property='og:site_name' content={title} />
    <meta property='og:locale' content='zh-tw' />
    <meta
      name='google-site-verification'
      content='9JFlPPjMcTWCa_ePEuHyFvlCv8LS2xZkeK3alcNc_oE'
    />
    <link rel='icon' href='/favicon.ico' />
    <link
      rel='alternate'
      hrefLang='zh-Hant'
      href='https://tod-blog-wlunareve.vercel.app/'
    />
  </Head>
);

export default HtmlHead;
