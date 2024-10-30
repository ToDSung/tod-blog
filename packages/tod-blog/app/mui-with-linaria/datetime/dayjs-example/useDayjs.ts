import 'dayjs/locale/zh-tw';
import dayjs, { ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';

import { DateExampleList } from '../constants';
import { useTimezone } from '../TimezoneContext';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

const runExample = () => {
  DateExampleList.forEach((example, i) => {
    console.log(
      example,
      '/',
      dayjs(example).tz('Asia/Tokyo').startOf('day').toISOString()
    );
  });
};

const useDayjs = (config: ConfigType) => {
  const { timezone } = useTimezone();
  const [date, setDate] = useState(dayjs.utc(config).tz(timezone));

  useEffect(() => {
    setDate(date => date.tz(timezone));
  }, [timezone]);

  return [date, setDate] as const;
};

export default useDayjs;
