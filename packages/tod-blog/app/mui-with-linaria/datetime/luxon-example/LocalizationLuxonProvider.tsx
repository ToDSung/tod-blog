'use client';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider as BaseLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReactNode } from 'react';

interface LocalizationProviderProps {
  children: ReactNode;
}

const LocalizationLuxonProvider = ({ children }: LocalizationProviderProps) => {
  return (
    <BaseLocalizationProvider dateAdapter={AdapterLuxon}>
      {children}
    </BaseLocalizationProvider>
  );
};

export default LocalizationLuxonProvider;
