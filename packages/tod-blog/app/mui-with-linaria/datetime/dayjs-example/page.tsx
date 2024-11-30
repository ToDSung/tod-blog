'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { NextPage } from 'next';

import SyntaxAndResult from '../components/SyntaxAndResult';
import TimezoneSelect from '../components/TimezoneSelect';
import { DATE_COMPARED, DATE_FORMATE } from '../constants';
import { useTimezone } from '../TimezoneContext';

import useDayjs from './useDayjs';

const DayjsExample: NextPage = () => {
  const [date, setDate] = useDayjs('2024-02-29 07:00');
  const { timezone } = useTimezone();

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

  return (
    <main className='flex w-[720px] max-w-5xl bg-white p-4'>
      <section id='main'>
        <div className='flex flex-col gap-4'>
          <TimezoneSelect />
          <SyntaxAndResult
            syntax='date.toISOString()'
            result={`UTC: ${date.toISOString()}`}
          />
          <SyntaxAndResult
            syntax={`date.format('${DATE_FORMATE['dayjs']}')`}
            result={`Local Time: ${date.format(DATE_FORMATE['dayjs'])}`}
          />
          <DatePickerLinaria
            value={date}
            timezone={timezone}
            format={DATE_FORMATE['dayjs'].split(' ').at(0)}
            onChange={handleChange}
          />
          <TimePickerLinaria
            value={date}
            timezone={timezone}
            format={DATE_FORMATE['dayjs'].split(' ').slice(1).join(' ')}
            onChange={handleChange}
          />
          <DateTimePickerLinaria
            value={date}
            timezone={timezone}
            format={`${DATE_FORMATE['dayjs']}`}
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
          <SyntaxAndResult
            syntax="date.startOf('day')"
            result={`Local Time: ${date.startOf('day').toISOString()}`}
          />
          <SyntaxAndResult
            syntax="date.endOf('day')"
            result={`Local Time: ${date.endOf('day').toISOString()}`}
          />
          <SyntaxAndResult
            syntax={`date.isBefore(dayjs('${DATE_COMPARED}'))`}
            result={`IsBefore: ${date.isBefore(dayjs(DATE_COMPARED))}`}
          />
          <SyntaxAndResult
            syntax={`date.isAfter(dayjs('${DATE_COMPARED}'))`}
            result={`IsAfter: ${date.isAfter(dayjs(DATE_COMPARED))}`}
          />
          <SyntaxAndResult
            syntax='date.fromNow()'
            result={`From Now: ${date.fromNow()}`}
          />
          <SyntaxAndResult
            syntax="date.locale('zh-tw').fromNow()"
            result={`From Now (zh-tw): ${date.locale('zh-tw').fromNow()}`}
          />
        </div>
      </section>
    </main>
  );
};

export default DayjsExample;
