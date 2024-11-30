'use client';

import ButtonLinaria from '@curi/mui-with-linaria/ButtonLinaria';
import DatePickerLinaria from '@curi/mui-with-linaria/DatePickerLinaria';
import DateTimePickerLinaria from '@curi/mui-with-linaria/DateTimePickerLinaria';
import TimePickerLinaria from '@curi/mui-with-linaria/TimePickerLinaria';
import { DateTime } from 'luxon';

import type { DurationLike } from 'luxon';
import type { NextPage } from 'next';

import SyntaxAndResult from '../components/SyntaxAndResult';
import TimezoneSelect from '../components/TimezoneSelect';
import { DATE_COMPARED, DATE_FORMATE } from '../constants';
import { useTimezone } from '../TimezoneContext';

import useLuxon from './useLuxon';

const DayjsExample: NextPage = () => {
  const [date, setDate] = useLuxon('2024-02-29T07:00');
  const { timezone } = useTimezone();

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

  return (
    <main className='flex w-[720px] max-w-5xl bg-white p-4'>
      <section id='main'>
        <div className='flex flex-col gap-4'>
          <TimezoneSelect />
          <SyntaxAndResult
            syntax='date.toUTC().toISO()'
            result={`UTC: ${date.toUTC().toISO()}`}
          />
          <SyntaxAndResult
            syntax={`date.toFormat(${DATE_FORMATE['luxon']})`}
            result={`Local Time: ${date.toFormat(DATE_FORMATE['luxon'])}`}
          />
          <DatePickerLinaria
            value={date}
            timezone={timezone}
            format={DATE_FORMATE['luxon'].split(' ').at(0)}
            onChange={handleChange}
          />
          <TimePickerLinaria
            value={date}
            timezone={timezone}
            format={DATE_FORMATE['luxon'].split(' ').slice(1).join(' ')}
            onChange={handleChange}
          />
          <DateTimePickerLinaria
            value={date}
            timezone={timezone}
            format={`${DATE_FORMATE['luxon']}`}
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
          <SyntaxAndResult
            syntax='date.startOf(day)'
            result={`Local Time: ${date.startOf('day').toUTC().toISO()}`}
          />
          <SyntaxAndResult
            syntax="date.endOf('day')"
            result={`Local Time: ${date.endOf('day').toUTC().toISO()}`}
          />
          <SyntaxAndResult
            syntax={`date < DateTime.fromISO('${DATE_COMPARED}'))`}
            result={`IsBefore: ${date < DateTime.fromISO(DATE_COMPARED)}`}
          />
          <SyntaxAndResult
            syntax={`date > DateTime.fromISO('${DATE_COMPARED}'))`}
            result={`IsAfter: ${date > DateTime.fromISO(DATE_COMPARED)}`}
          />
          <SyntaxAndResult
            syntax={"date.toRelative({ locale: 'en-us' })"}
            result={`From Now: ${date.toRelative({ locale: 'en-us' })}`}
          />
          <SyntaxAndResult
            syntax={"date.toRelative({ locale: 'zh-tw' })"}
            result={`From Now: ${date.toRelative({ locale: 'zh-tw' })}`}
          />
        </div>
      </section>
    </main>
  );
};

export default DayjsExample;
