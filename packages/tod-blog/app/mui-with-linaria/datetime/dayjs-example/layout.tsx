'use client';

import { ReactNode } from 'react';

import { TimezoneProvider } from '../TimezoneContext';

import LocalizationDayjsProvider from './LocalizationDayjsProvider';

interface RootLayoutProps {
  children: ReactNode;
}

const DayjsExampleLayout = ({ children }: RootLayoutProps) => {
  return (
    <LocalizationDayjsProvider>
      <TimezoneProvider>{children}</TimezoneProvider>
    </LocalizationDayjsProvider>
  );
};

export default DayjsExampleLayout;
