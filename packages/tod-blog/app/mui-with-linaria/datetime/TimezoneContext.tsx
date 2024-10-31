'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface TimezoneContextType {
  timezone: string;
  setTimezone: (timezone: string) => void;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(
  undefined
);

interface TimezoneProviderProps {
  children: ReactNode;
}

export const TimezoneProvider = ({ children }: TimezoneProviderProps) => {
  const [timezone, setTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};

export const useTimezone = (): TimezoneContextType => {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
};
