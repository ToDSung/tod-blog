import NextHead from 'next/head';
import { ReactNode } from 'react';

type HeadProps = {
  title: string;
  author: string;
  description: string;
  url: string;
  favicon?: string;
  children?: ReactNode;
};

const Head = ({
  title,
  author,
  description,
  url,
  favicon,
  children,
}: HeadProps) => {
  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content={author} />
      <meta property='og:title' content={description} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content='zh-tw' />
      {favicon && <link rel='icon' href={favicon} />}
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
      <link rel='alternate' hrefLang='zh-Hant' href={url} />
      {children}
    </NextHead>
  );
};

export default Head;
