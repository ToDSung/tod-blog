'use client';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider as BaseLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import type { ReactNode } from 'react';

interface LocalizationProviderProps {
  children: ReactNode;
}

const LocalizationDateFnsProvider = ({
  children,
}: LocalizationProviderProps) => {
  return (
    <BaseLocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </BaseLocalizationProvider>
  );
};

export default LocalizationDateFnsProvider;
