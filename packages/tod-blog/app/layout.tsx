import '@/styles/globals.css';

import Navbar from '@/app/components/Navbar';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
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
