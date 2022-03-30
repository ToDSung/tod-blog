import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import Head from '@/components/Head';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head title="Tod's personal blog from TW" />
      <main id='app' className='app flex justify-center	text-justify'>
        <Navbar />
        <div className='component-wrapper relative mt-[3.25rem] w-[80vw] max-w-[1680px]'>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
