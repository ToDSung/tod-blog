import { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  description: string;
};

const HtmlHead: FC<Props> = ({
  title,
  description = 'I am ToD 努力嘗試分享的小小前端，希望這邊有任何一篇文章能夠幫助到你！',
}) => {
  const titleContent = title
    ? `${title} - Tod'blog`
    : "Tod's personal blog from TW";

  return (
    <Head>
      <meta charSet='UTF-8' />
      <title>{titleContent}</title>
      <meta name='description' content={description} />
      <meta name='author' content='Tod Sung' />
      <meta property='og:title' content={titleContent} />
      <meta property='og:description' content={description} />
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
};

export default HtmlHead;
