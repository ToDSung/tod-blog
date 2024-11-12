'use client';

import { useRef, useState } from 'react';
import { merge, takeUntil } from 'rxjs';

import type { FetchState } from './utils';

import ControlTemplate from './ControlTemplate';
import useCancelSignal from './useCancelSIgnal';
import { api1$, api2$, api3$ } from './utils';

/**
 * merge 能夠併發，並且將所有結果 return 為一個 array
 */
const useMergeFetch = () => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
  });
  const { cancel, signal } = useCancelSignal();
  const startTime = useRef<number>(0);

  const fetch = () => {
    setState(() => ({ data: [], isLoading: true, error: null }));
    startTime.current = Date.now();

    const mergeFetchObservable = merge(api1$(), api3$(), api2$()).pipe(
      takeUntil(signal)
    );

    mergeFetchObservable.subscribe({
      next: responses => {
        setState(prev => ({
          ...prev,
          data: [...(prev.data || []), responses],
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

const MergeFetch = () => {
  const { data, startTime, isLoading, fetch, cancelFetch } = useMergeFetch();

  return (
    <ControlTemplate
      title='merge fetch'
      description='不管 event 的順序，就像 forEach 跑 Promise'
      data={data}
      startTime={startTime}
      isLoading={isLoading}
      onFetchClick={fetch}
      onCancelClick={cancelFetch}
    />
  );
};

export default MergeFetch;
