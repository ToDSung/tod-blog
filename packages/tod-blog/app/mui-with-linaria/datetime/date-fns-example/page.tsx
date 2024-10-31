'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import {
  addHours,
  addMonths,
  format,
  formatDistanceToNow,
  subHours,
  subMonths,
} from 'date-fns';
import { zhTW } from 'date-fns/locale';
import type { NextPage } from 'next';

import Typography from '@/components/Typography';

import { useTimezone } from '../TimezoneContext';

import useDateFns from './useDataFns';

const DateFnsExample: NextPage = () => {
  const [date, setDate, zonedTimeDate, setZonedTimeDate] =
    useDateFns('2024-02-29 07:00');
  const { timezone, setTimezone } = useTimezone();

  const handleChange = (value: Date | null) => {
    if (value === null) return;
    setZonedTimeDate(value);
  };

  const handlePastHourClick = () => {
    setDate(subHours(date, 1));
  };

  const handleNextHourClick = () => {
    setDate(addHours(date, 1));
  };

  const handleYesterdayClick = () => {
    setDate(subMonths(date, 1));
  };

  const handleTomorrowClick = () => {
    setDate(addMonths(date, 1));
  };

  const handleTimezoneChange = (event: SelectChangeEvent) => {
    setTimezone(event.target.value);
  };

  return (
    <main className='flex w-[720px] max-w-5xl bg-white p-4'>
      <section id='main'>
        <div className='flex items-center gap-4'>
          <Typography variant='h4' className='text-green-900'>
            Current Timezone: {timezone}
          </Typography>
          <Select value={timezone} onChange={handleTimezoneChange}>
            <MenuItem value={'America/New_York'}>New York (UTC - 5)</MenuItem>
            <MenuItem value={'Europe/London'}>London (UTC + 0)</MenuItem>
            <MenuItem value={'Europe/Istanbul'}>Turkiye (UTC + 3)</MenuItem>
            <MenuItem value={'Asia/Taipei'}>Taipei (UTC + 8)</MenuItem>
          </Select>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5' className='text-black'>
            UTC: {date.toISOString()}
          </Typography>
          <Typography variant='h5' className='text-black'>
            Local Time: {format(zonedTimeDate, 'yyyy/MM/dd HH:mm:ss a')}
          </Typography>
          <DatePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            onChange={handleChange}
          />
          <TimePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            onChange={handleChange}
          />
          <DateTimePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            onChange={handleChange}
          />
          <div className='flex justify-between gap-2'>
            <ButtonLinaria variant='contained' onClick={handlePastHourClick}>
              past hour
            </ButtonLinaria>
            <ButtonLinaria variant='contained' onClick={handleNextHourClick}>
              next hour
            </ButtonLinaria>
          </div>
          <div className='flex justify-between gap-2'>
            <ButtonLinaria variant='contained' onClick={handleYesterdayClick}>
              yesterday
            </ButtonLinaria>
            <ButtonLinaria variant='contained' onClick={handleTomorrowClick}>
              tomorrow
            </ButtonLinaria>
          </div>
          <Typography variant='h5' className='text-black'>
            From Now: {formatDistanceToNow(date, { addSuffix: true })}
          </Typography>
          <Typography variant='h5' className='text-black'>
            From Now (zh-tw):
            {formatDistanceToNow(date, { locale: zhTW, addSuffix: true })}
          </Typography>
        </div>
      </section>
    </main>
  );
};

export default DateFnsExample;
