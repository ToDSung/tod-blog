'use client';

import { useRef, useState } from 'react';
import { concat, takeUntil } from 'rxjs';

import type { FetchState } from './utils';

import ControlTemplate from './ControlTemplate';
import useCancelSignal from './useCancelSIgnal';
import { api1$, api2$, api3$ } from './utils';

/**
 * concat 會依序執行，並且會依序的 return 結果．不過以 call api 的例子來說，並非會等到前一個 api 的 response 回傳後才呼叫下一個 api
 */
const useConcatFetch = () => {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
  });
  const { cancel, signal } = useCancelSignal();
  const startTime = useRef<number>(0);

  const fetch = () => {
    setState(() => ({ data: [], isLoading: true, error: null }));
    startTime.current = Date.now();

    const concatFetchObservable = concat(api1$(), api3$(), api2$()).pipe(
      takeUntil(signal)
    );

    concatFetchObservable.subscribe({
      next: response => {
        setState(prev => ({
          ...prev,
          data: [...(prev.data || []), response],
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

const ConcatFetch = () => {
  const { data, startTime, isLoading, fetch, cancelFetch } = useConcatFetch();

  return (
    <ControlTemplate
      title='concat fetch'
      description='照順序發，並照順序回'
      data={data}
      startTime={startTime}
      isLoading={isLoading}
      onFetchClick={fetch}
      onCancelClick={cancelFetch}
    />
  );
};

export default ConcatFetch;
