import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { useState } from 'react';

import { useTimezone } from '../TimezoneContext';

const useDateFns = (value: number | string | Date) => {
  const { timezone } = useTimezone();
  const [dateInternal, setDateInternal] = useState(
    fromZonedTime(new Date(value), timezone)
  );

  const zonedTimeDate = toZonedTime(dateInternal, timezone);

  const setZonedTimeDate: typeof setDateInternal = value => {
    setDateInternal(fromZonedTime(new Date(value as Date), timezone));
  };

  return [
    dateInternal,
    setDateInternal,
    zonedTimeDate,
    setZonedTimeDate,
  ] as const;
};

export default useDateFns;
