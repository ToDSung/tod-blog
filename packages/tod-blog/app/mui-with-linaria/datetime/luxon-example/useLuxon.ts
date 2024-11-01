import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { useTimezone } from '../TimezoneContext';

const useLuxon = (value: string) => {
  const { timezone } = useTimezone();
  const [date, setDate] = useState(DateTime.fromISO(value));

  useEffect(() => {
    setDate(date => date.setZone(timezone));
  }, [timezone]);

  return [date, setDate] as const;
};

export default useLuxon;
