'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { map, of, scan } from 'rxjs';

import Typography from '@/components/Typography';

import useCounter from './useCounter';

const studentScore = [
  { name: '小明', score: 100 },
  { name: '小王', score: 49 },
  { name: '小李', score: 30 },
];

type StudentScore = typeof studentScore;

const Map = () => {
  const [data, setData] = useState<StudentScore>([]);

  const { count: mergeAllCount, start: startMergeAll } = useCounter('mergeAll');
  const { count: switchAllCount, start: startSwitchAll } =
    useCounter('switchAll');
  const { count: concatAllCount, start: startConcatAll } =
    useCounter('concatAll');

  useEffect(() => {
    of(...studentScore)
      .pipe(
        map(student => ({ ...student, score: Math.sqrt(student.score) })),
        map(student => ({ ...student, score: student.score * 10 })),
        map(student => ({ ...student, score: Math.ceil(student.score) })),
        scan<StudentScore[number], StudentScore>(
          (acc, student) => [...acc, student],
          []
        )
      )
      .subscribe(studentScore => setData(studentScore));
  }, []);

  // console.log(JSON.stringify(data, null, 2));

  return (
    <div className='flex flex-col gap-4'>
      <Typography variant='h3'>
        open console to see the map operation result
      </Typography>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2'>
          <div>merge all count: {mergeAllCount}</div>
          <Button variant='contained' onClick={startMergeAll}>
            Start Count
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <div>switch all count: {switchAllCount}</div>
          <Button variant='contained' onClick={startSwitchAll}>
            Start Count
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <div>concat all count: {concatAllCount}</div>
          <Button variant='contained' onClick={startConcatAll}>
            Start Count
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Map;
