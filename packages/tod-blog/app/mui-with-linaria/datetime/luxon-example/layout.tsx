import { ReactNode } from 'react';

import { TimezoneProvider } from '../TimezoneContext';

import LocalizationLuxonProvider from './LocalizationLuxonProvider';

interface RootLayoutProps {
  children: ReactNode;
}

const LuxonExampleLayout = ({ children }: RootLayoutProps) => {
  return (
    <LocalizationLuxonProvider>
      <TimezoneProvider>{children}</TimezoneProvider>
    </LocalizationLuxonProvider>
  );
};

export default LuxonExampleLayout;
