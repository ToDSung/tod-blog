'use client';

import { useRef, useState } from 'react';
import { takeUntil } from 'rxjs';

import type { FetchState } from './utils';

import ControlTemplate from './ControlTemplate';
import useCancelSignal from './useCancelSIgnal';
import { api1$ } from './utils';

const useFetch = () => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
  });
  const { cancel, signal } = useCancelSignal();
  const startTime = useRef<number>(0);

  const fetch = () => {
    setState(() => ({ data: [], isLoading: true, error: null }));
    startTime.current = Date.now();

    const fetchObservable = api1$().pipe(takeUntil(signal));

    fetchObservable.subscribe({
      next: response => {
        setState(prev => ({
          ...prev,
          data: [...(prev.data || []), response],
        }));
        setState(prev => ({ ...prev, isLoading: false }));
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

const Cancel = () => {
  const { data, startTime, isLoading, fetch, cancelFetch } = useFetch();

  return (
    <ControlTemplate
      title='basic fetch'
      data={data}
      startTime={startTime}
      isLoading={isLoading}
      onFetchClick={fetch}
      onCancelClick={cancelFetch}
    />
  );
};

export default Cancel;
