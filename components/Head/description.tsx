import { FC } from 'react';
import Head from 'next/head';

type Props = {
  value?: string;
};

const Description: FC<Props> = ({
  value = 'I am ToD 努力嘗試分享的小小前端，希望這邊有任何一篇文章能夠幫助到你！',
}) => (
  <>
    <meta name='description' content={value} />
    <meta property='og:description' content={value} />
  </>
);

export default Description;
