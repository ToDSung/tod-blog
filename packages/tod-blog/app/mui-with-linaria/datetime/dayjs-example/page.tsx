'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { type Dayjs } from 'dayjs';
import type { NextPage } from 'next';

import Typography from '@/components/Typography';

import { useTimezone } from '../TimezoneContext';

import useDayjs from './useDayjs';

const DayjsExample: NextPage = () => {
  const [date, setDate] = useDayjs('2024-02-29 07:00');
  const { timezone, setTimezone } = useTimezone();

  const handleChange = (value: Dayjs | null) => {
    if (value === null) return;
    setDate(value);
  };

  const handleBack = (unit: 'day' | 'hour') => () => {
    setDate(date.subtract(1, unit));
  };

  const handleNext = (unit: 'day' | 'hour') => () => {
    setDate(date.add(1, unit));
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
            <MenuItem value={'Asia/Taipei'}>Taipei (UTC + 8)</MenuItem>
          </Select>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5' className='text-black'>
            UTC: {date.toISOString()}
          </Typography>
          <Typography variant='h5' className='text-black'>
            Local Time: {date.format('YYYY/MM/DD HH:mm:ss A')}
          </Typography>
          <DatePickerLinaria
            value={date}
            timezone={timezone}
            onChange={handleChange}
          />
          <TimePickerLinaria
            value={date}
            timezone={timezone}
            onChange={handleChange}
          />
          <DateTimePickerLinaria
            value={date}
            timezone={timezone}
            onChange={handleChange}
          />
          <div className='flex justify-between gap-2'>
            <ButtonLinaria variant='contained' onClick={handleBack('hour')}>
              past hour
            </ButtonLinaria>
            <ButtonLinaria variant='contained' onClick={handleNext('hour')}>
              next hour
            </ButtonLinaria>
          </div>
          <div className='flex justify-between gap-2'>
            <ButtonLinaria variant='contained' onClick={handleBack('day')}>
              yesterday
            </ButtonLinaria>
            <ButtonLinaria variant='contained' onClick={handleNext('day')}>
              tomorrow
            </ButtonLinaria>
          </div>
          <Typography variant='h5' className='text-black'>
            From Now: {date.fromNow()}
          </Typography>
          <Typography variant='h5' className='text-black'>
            From Now (zh-tw): {date.locale('zh-tw').fromNow()}
          </Typography>
        </div>
      </section>
    </main>
  );
};

export default DayjsExample;
