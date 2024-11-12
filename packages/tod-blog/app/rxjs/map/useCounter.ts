import { useEffect, useRef, useState } from 'react';
import { Subject, concatAll, interval, map, mergeAll, switchAll } from 'rxjs';

const useCounter = (operator: 'mergeAll' | 'switchAll' | 'concatAll') => {
  const [count, setCount] = useState(0);
  const startSubject = useRef(new Subject<void>());

  useEffect(() => {
    startSubject.current = new Subject<void>();

    return () => {
      startSubject.current.complete();
    };
  }, []);

  useEffect(() => {
    const higherOrder = startSubject.current.pipe(map(() => interval(1000)));

    const operatorMap = {
      mergeAll,
      switchAll,
      concatAll,
    };

    const firstOrder = higherOrder.pipe(operatorMap[operator]());

    firstOrder.subscribe(value => {
      console.log(value);
      setCount(value);
    });
  }, [operator]);

  return {
    count,
    start: () => {
      startSubject.current.next();
    },
  };
};

export default useCounter;
