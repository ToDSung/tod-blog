import 'dayjs/locale/zh-tw';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';

import type { ConfigType } from 'dayjs';

import { useTimezone } from '../TimezoneContext';

extend(utc);
extend(relativeTime);
extend(timezone);

const useDayjs = (config: ConfigType) => {
  const { timezone } = useTimezone();
  const [date, setDate] = useState(dayjs.tz(config));

  useEffect(() => {
    setDate(date => date.tz(timezone));
  }, [timezone]);

  return [date, setDate] as const;
};

export default useDayjs;
