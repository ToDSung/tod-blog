'use client';

import { useEffect } from 'react';
import { fromEvent, merge, throttle, timer } from 'rxjs';

import Typography from '@/components/Typography';

const Merge = () => {
  useEffect(() => {
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      throttle(() => timer(1000))
    );
    const mouseClick$ = fromEvent<PointerEvent>(document, 'click');

    merge(mouseMove$, mouseClick$).subscribe(event => console.log(event));
  }, []);

  return (
    <Typography variant='h3'>
      open console to see the map operation result
    </Typography>
  );
};

export default Merge;
