import { FC } from 'react';
import Head from 'next/head';

type Props = {
  value?: string;
};

const Title: FC<Props> = ({ value }) => {
  const title = value ? `${value} - Tod'blog` : "Tod's personal blog from TW";

  return (
    <>
      <title>{title}</title>
      <meta property='og:title' content={title} />
    </>
  );
};

export default Title;
