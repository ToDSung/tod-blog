import { useEffect, useRef } from 'react';
import { Subject, tap } from 'rxjs';

const useCancelSignal = () => {
  const cancelSubject = useRef(new Subject<void>());

  useEffect(() => {
    return () => {
      cancelSubject.current.next();
    };
  }, []);

  return {
    signal: cancelSubject.current.pipe(
      tap(() => console.log('🛑 TakeUntil received signal - stopping fetch'))
    ),
    cancel: () => {
      cancelSubject.current.next();
    },
  };
};

export default useCancelSignal;
