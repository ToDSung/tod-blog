'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as BaseLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReactNode } from 'react';

interface LocalizationProviderProps {
  children: ReactNode;
}

const LocalizationDayjsProvider = ({ children }: LocalizationProviderProps) => {
  return (
    <BaseLocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </BaseLocalizationProvider>
  );
};

export default LocalizationDayjsProvider;
