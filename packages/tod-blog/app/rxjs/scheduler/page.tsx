'use client';

import { Button } from '@mui/material';
import { useRef } from 'react';
import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  combineLatest,
  interval,
  observeOn,
  of,
  queueScheduler,
  scan,
  scheduled,
  startWith,
  subscribeOn,
  takeWhile,
} from 'rxjs';

import type { SchedulerLike } from 'rxjs';

const Scheduler = () => {
  const handleClick = (scheduler?: SchedulerLike) => () => {
    console.log('start');

    const observable$ = scheduler
      ? of(1, 2, 3).pipe(observeOn(scheduler))
      : of(1, 2, 3);

    observable$.subscribe({
      next: value => console.log(`next: ${value}`),
      complete: () => console.log('complete'),
    });
    console.log('end');
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const handleAnimation = (scheduler?: SchedulerLike) => () => {
    const observable = scheduler ? interval(0, scheduler) : interval(0);

    observable
      .pipe(
        scan(width => width + 1, 0),
        takeWhile(
          width => width <= (containerRef.current?.clientWidth ?? 1280)
        ),
        startWith(0)
      )
      .subscribe(width => {
        console.log(width);
        if (squareRef.current) {
          squareRef.current.style.width = `${width}px`;
        }
      });
  };

  const handleWithoutQueueScheduler = () => {
    const a$ = of(1, 2);
    const b$ = of(3, 4);
    const c$ = of(5, 6);

    console.log('before');
    combineLatest(a$, b$, c$)
      .pipe()
      .subscribe(value => console.log(JSON.stringify(value)));
    console.log('after');
  };

  const handleWithQueueScheduler = () => {
    const a$ = scheduled([1, 2], queueScheduler);
    const b$ = scheduled([3, 4], queueScheduler);
    const c$ = scheduled([5, 6], queueScheduler);

    console.log('before');
    combineLatest([a$, b$, c$])
      .pipe(subscribeOn(queueScheduler))
      .subscribe(value => console.log(JSON.stringify(value)));
    console.log('after');
  };

  return (
    <div className='my-4 flex w-full flex-col gap-4'>
      <div className='flex gap-4'>
        <Button variant='contained' onClick={handleClick()}>
          Null Scheduler
        </Button>
        <Button variant='contained' onClick={handleClick(queueScheduler)}>
          Queue Scheduler
        </Button>
        <Button variant='contained' onClick={handleClick(asapScheduler)}>
          ASAP Scheduler
        </Button>
        <Button variant='contained' onClick={handleClick(asyncScheduler)}>
          Async Scheduler
        </Button>
        <Button
          variant='contained'
          onClick={handleClick(animationFrameScheduler)}
        >
          Animation Frame Scheduler
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button variant='contained' onClick={handleAnimation()}>
          Null Scheduler Animation
        </Button>
        <Button variant='contained' onClick={handleAnimation(queueScheduler)}>
          Queue Scheduler Animation
        </Button>
        <Button variant='contained' onClick={handleAnimation(asapScheduler)}>
          ASAP Scheduler Animation
        </Button>
        <Button variant='contained' onClick={handleAnimation(asyncScheduler)}>
          Async Scheduler Animation
        </Button>
        <Button
          variant='contained'
          onClick={handleAnimation(animationFrameScheduler)}
        >
          Animation Frame Scheduler Animation
        </Button>
      </div>
      <div ref={containerRef} className='w-full'>
        <div ref={squareRef} className='h-4 w-0 bg-red-500'></div>
      </div>
      <div className='flex gap-4'>
        <Button variant='contained' onClick={handleWithoutQueueScheduler}>
          without queue scheduler
        </Button>
        <Button variant='contained' onClick={handleWithQueueScheduler}>
          with queue scheduler
        </Button>
      </div>
    </div>
  );
};

export default Scheduler;
