import Head from '@curi/components/Head';

type Props = {
  title: string;
  description: string;
};

const HtmlHead = ({
  title,
  description = 'I am ToD 努力嘗試分享的小小前端，希望這邊有任何一篇文章能夠幫助到你！',
}: Props) => {
  const titleContent = title
    ? `${title} - Tod's blog`
    : "Tod's personal blog from TW";

  return (
    <Head
      title={titleContent}
      description={description}
      author='ToD Sung'
      favicon='/favicon.ico'
      url='https://tod-blog.vercel.app/'
    >
      <meta
        name='google-site-verification'
        content='9JFlPPjMcTWCa_ePEuHyFvlCv8LS2xZkeK3alcNc_oE'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HtmlHead;
