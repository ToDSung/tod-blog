import { FC } from 'react';
import Head from 'next/head';

import Descrition from './description';
import Title from './title';

type Props = {
  title: string;
  description: string;
};

const HtmlHead: FC<Props> = ({ title, description }) => (
  <Head>
    <meta charSet='UTF-8' />
    <Title value={title} />
    <Descrition value={description} />
    <meta name='author' content='Tod Sung' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://tod-blog.vercel.app/' />
    <meta property='og:locale' content='zh-tw' />
    <meta
      name='google-site-verification'
      content='9JFlPPjMcTWCa_ePEuHyFvlCv8LS2xZkeK3alcNc_oE'
    />
    <link rel='icon' href='/favicon.ico' />
    <link
      rel='alternate'
      hrefLang='zh-Hant'
      href='https://tod-blog.vercel.app/'
    />
    <link
      rel='preload'
      href='/fonts/JasonHandwriting/JasonHandwriting1.ttf'
      as='font'
      crossOrigin=''
    />
    <link
      rel='preload'
      href='/fonts/DiamorScript/Diamor.ttf'
      as='font'
      crossOrigin=''
    />
  </Head>
);

export default HtmlHead;
