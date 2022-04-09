import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import Head from '@/components/Head';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head title="Tod's personal blog from TW" />
      <main id='app' className='app mx-2 flex	justify-center text-justify'>
        <Navbar />
        <div className='component-wrapper relative mt-[3.2rem] w-full max-w-[1680px] sm:w-[80vw]'>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
