import '@/styles/globals.css';

import { Caveat } from 'next/font/google';

import Navbar from '@/app/components/Navbar';

export const metadata = {
  title: "Tod's personal blog",
  description: 'This is a personal blog created by tod sung',
};

const caveat = Caveat({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={caveat.className}>
      <body>
        <main
          id='app'
          className='app bg-default-canvas text-default-text flex min-h-screen justify-center px-2 text-justify '
        >
          <Navbar />
          <div className='component-wrapper relative mt-[3.2rem] flex w-full justify-center sm:w-[80vw]'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
