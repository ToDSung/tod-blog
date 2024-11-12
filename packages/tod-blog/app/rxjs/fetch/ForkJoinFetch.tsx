'use client';

import { useRef, useState } from 'react';
import { forkJoin, takeUntil } from 'rxjs';

import type { FetchState } from './utils';

import ControlTemplate from './ControlTemplate';
import useCancelSignal from './useCancelSIgnal';
import { api1$, api2$, api3$ } from './utils';

/**
 * forkJoin 能夠併發，並且將所有結果 return 為一個 array
 */
const useForkJoinFetch = () => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
  });
  const { cancel, signal } = useCancelSignal();
  const startTime = useRef<number>(0);

  const fetch = () => {
    setState(() => ({ data: [], isLoading: true, error: null }));
    startTime.current = Date.now();

    const forkJoinFetchObservable = forkJoin([api1$(), api3$(), api2$()]).pipe(
      takeUntil(signal)
    );

    forkJoinFetchObservable.subscribe({
      next: responses => {
        setState(prev => ({
          ...prev,
          data: [...(prev.data || []), ...responses],
        }));
      },
      complete: () => {
        setState(prev => ({ ...prev, isLoading: false }));
      },
    });
  };

  const cancelFetch = () => {
    cancel();
    setState(prev => ({ ...prev, isLoading: false }));
  };

  return {
    ...state,
    startTime: startTime.current,
    fetch,
    cancelFetch,
  };
};

const ForkJoinFetch = () => {
  const { data, startTime, isLoading, fetch, cancelFetch } = useForkJoinFetch();

  return (
    <ControlTemplate
      title='fork join fetch'
      description='併發，並回應成一個 array，就像 Promise.all'
      data={data}
      startTime={startTime}
      isLoading={isLoading}
      onFetchClick={fetch}
      onCancelClick={cancelFetch}
    />
  );
};

export default ForkJoinFetch;
