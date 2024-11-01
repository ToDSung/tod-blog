'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { DateTime, type DurationLike } from 'luxon';
import type { NextPage } from 'next';

import Typography from '@/components/Typography';

import { DATE_FORMATE } from '../constants';
import { useTimezone } from '../TimezoneContext';

import useLuxon from './useLuxon';

const DayjsExample: NextPage = () => {
  const [date, setDate] = useLuxon('2024-02-29T07:00');
  const { timezone, setTimezone } = useTimezone();

  const handleChange = (value: DateTime | null) => {
    if (value === null) return;
    setDate(value);
  };

  const handleBack = (duration: DurationLike) => () => {
    setDate(date.minus(duration));
  };

  const handleNext = (duration: DurationLike) => () => {
    setDate(date.plus(duration));
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
            UTC: {date.toUTC().toISO()}
          </Typography>
          <Typography variant='h5' className='text-black'>
            Local Time: {date.toFormat(DATE_FORMATE['luxon'])}
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
            <ButtonLinaria
              variant='contained'
              onClick={handleBack({ hour: 1 })}
            >
              past hour
            </ButtonLinaria>
            <ButtonLinaria
              variant='contained'
              onClick={handleNext({ hour: 1 })}
            >
              next hour
            </ButtonLinaria>
          </div>
          <div className='flex justify-between gap-2'>
            <ButtonLinaria
              variant='contained'
              onClick={handleBack({ days: 1 })}
            >
              yesterday
            </ButtonLinaria>
            <ButtonLinaria
              variant='contained'
              onClick={handleNext({ days: 1 })}
            >
              tomorrow
            </ButtonLinaria>
          </div>
          <Typography variant='h5' className='text-black'>
            From Now: {date.toRelative({ locale: 'en-us' })}
          </Typography>
          <Typography variant='h5' className='text-black'>
            From Now (zh-tw): {date.toRelative({ locale: 'zh-tw' })}
          </Typography>
        </div>
      </section>
    </main>
  );
};

export default DayjsExample;
