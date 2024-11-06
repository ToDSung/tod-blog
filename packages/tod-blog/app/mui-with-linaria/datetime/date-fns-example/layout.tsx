'use client';

import { ReactNode } from 'react';

import { TimezoneProvider } from '../TimezoneContext';

import LocalizationDateFnsProvider from './LocalizationDateFnsProvider';

interface RootLayoutProps {
  children: ReactNode;
}

const DateFnsExampleLayout = ({ children }: RootLayoutProps) => {
  return (
    <LocalizationDateFnsProvider>
      <TimezoneProvider>{children}</TimezoneProvider>
    </LocalizationDateFnsProvider>
  );
};

export default DateFnsExampleLayout;
