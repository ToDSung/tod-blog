'use client';

import { useRef, useState } from 'react';
import { defer, forkJoin, merge, mergeMap, of, takeUntil, timer } from 'rxjs';

import type { FetchState } from './utils';

import ControlTemplate from './ControlTemplate';
import useCancelSignal from './useCancelSIgnal';
import { api1$, api2$, api3$ } from './utils';

const observable = merge([of(1, 2, 3, 4), Promise.resolve(8), timer(4000)]);
observable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('This is how it ends!'),
});

/**
 * mergeMap 將 observable 轉為另一個 observable 藉此來達到依序執行的效果，並且只留下一個最後的 result
 */
const useMergeMapFetch = () => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
  });
  const { cancel, signal } = useCancelSignal();
  const startTime = useRef<number>(0);

  const fetch = () => {
    setState(() => ({ data: [], isLoading: true, error: null }));
    startTime.current = Date.now();

    const mergeMapFetchObservable = defer(api1$).pipe(
      mergeMap(api1Response => [of(api1Response), api3$()]),
      mergeMap(api1and3Response => forkJoin([api1and3Response, api2$()])),
      takeUntil(signal)
    );

    mergeMapFetchObservable.subscribe({
      next: response => {
        console.log(response);
        setState(prev => ({
          ...prev,
          data: [...(prev.data || []), ...response],
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

const MergeMapFetch = () => {
  const { data, startTime, isLoading, fetch, cancelFetch } = useMergeMapFetch();

  return (
    <ControlTemplate
      title='mergeMap fetch'
      data={data}
      startTime={startTime}
      isLoading={isLoading}
      onFetchClick={fetch}
      onCancelClick={cancelFetch}
    />
  );
};

export default MergeMapFetch;
