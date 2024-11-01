'use client';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { Settings } from 'luxon';
import { createContext, useContext, useState, type ReactNode } from 'react';

dayjs.extend(timezone);

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
  const [timezone, setTimezone] = useState<string>('America/New_York');

  dayjs.tz.setDefault(timezone);
  Settings.defaultZone = timezone;

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
