import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import Head from '@/components/Head';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const { head } = pageProps;
  return (
    <>
      <Head {...head} />
      <main
        id='app'
        className='app flex justify-center	bg-default-canvas px-2 text-justify text-default-text'
      >
        <Navbar />
        <div className='component-wrapper relative mt-[3.2rem] w-full max-w-[1280px] sm:w-[80vw]'>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
