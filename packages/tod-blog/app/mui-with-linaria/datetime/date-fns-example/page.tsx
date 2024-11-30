'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import {
  addHours,
  addMonths,
  endOfDay,
  format,
  formatDistanceToNow,
  isAfter,
  isBefore,
  startOfDay,
  subHours,
  subMonths,
} from 'date-fns';
import { zhTW } from 'date-fns/locale';

import type { NextPage } from 'next';

import SyntaxAndResult from '../components/SyntaxAndResult';
import TimezoneSelect from '../components/TimezoneSelect';
import { DATE_COMPARED, DATE_FORMATE } from '../constants';
import { useTimezone } from '../TimezoneContext';

import useDateFns from './useDataFns';

const DateFnsExample: NextPage = () => {
  const [date, setDate, zonedTimeDate, setZonedTimeDate] =
    useDateFns('2024-02-29 07:00');
  const { timezone } = useTimezone();

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
            syntax={`format(zonedTimeDate, ${DATE_FORMATE['datefns']})`}
            result={`Local Time: ${format(
              zonedTimeDate,
              'yyyy/MM/dd HH:mm:ss a'
            )}`}
          />
          <DatePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            format={DATE_FORMATE['datefns'].split(' ').at(0)}
            onChange={handleChange}
          />
          <TimePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            format={DATE_FORMATE['datefns'].split(' ').slice(1).join(' ')}
            onChange={handleChange}
          />
          <DateTimePickerLinaria
            value={zonedTimeDate}
            timezone={timezone}
            format={`${DATE_FORMATE['datefns']}`}
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
          <SyntaxAndResult
            syntax='startOfDay(date)'
            result={`Local Time: ${startOfDay(zonedTimeDate).toISOString()}`}
          />
          <SyntaxAndResult
            syntax='endOfDay(date)'
            result={`Local Time: ${endOfDay(date).toISOString()}`}
          />
          <SyntaxAndResult
            syntax={`isBefore(date, new Date('${DATE_COMPARED}'))`}
            result={`IsBefore: ${isBefore(date, new Date(DATE_COMPARED))}`}
          />
          <SyntaxAndResult
            syntax={`isAfter(date, new Date('${DATE_COMPARED}'))`}
            result={`IsAfter: ${isAfter(date, new Date(DATE_COMPARED))}`}
          />
          <SyntaxAndResult
            syntax='formatDistanceToNow(date, { addSuffix: true })'
            result={`From Now: ${formatDistanceToNow(date, {
              addSuffix: true,
            })}`}
          />
          <SyntaxAndResult
            syntax='formatDistanceToNow(date, { locale: zhTW, addSuffix: true })'
            result={`From Now (zh-tw): ${formatDistanceToNow(date, {
              locale: zhTW,
              addSuffix: true,
            })}`}
          />
        </div>
      </section>
    </main>
  );
};

export default DateFnsExample;
