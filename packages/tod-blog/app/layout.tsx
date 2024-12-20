import '@/styles/globals.css';
import '@curi/mui-with-linaria/styles.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Caveat } from 'next/font/google';

import type { ReactNode } from 'react';

import Navbar from '@/app/components/Navbar';

export const generateMetadata = async () => {
  return {
    title: "Tod's personal blog",
    description: 'This is a personal blog created by tod sung from Taiwan',
    openGraph: {
      title: "Tod's personal blog",
      description: 'This is a personal blog created by tod sung from Taiwan',
      type: 'website',
      emails: 'wlunareve@gmail.com',
      locale: 'zh-tw',
    },
    verification: {
      google: '9JFlPPjMcTWCa_ePEuHyFvlCv8LS2xZkeK3alcNc_oE',
    },
  };
};

// const caveat = Caveat({
//   subsets: ['latin'],
// });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <main
            id='app'
            className='bg-default-canvas text-default-text flex min-h-screen justify-center px-2 text-justify'
          >
            <Navbar />
            <div className='relative mt-[3.2rem] flex w-full justify-center sm:w-[80vw]'>
              {children}
            </div>
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
