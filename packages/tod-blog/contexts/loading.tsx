import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import Progress from '@/components/Progress';

const TIMEOUT = 0;

type initialState = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  needLoading: boolean;
  setNeedLoading: Dispatch<SetStateAction<boolean>>;
  handleLoadingStart: () => Dispatch<SetStateAction<boolean>> | any;
};

const initialState: initialState = {
  loading: true,
  setLoading: () => {
    // do nothing.
  },
  needLoading: false,
  setNeedLoading: () => {
    // do nothing.
  },
  handleLoadingStart: () => {
    // do nothing.
  },
};

const loadingContext = createContext(initialState);

type Props = {
  children: ReactNode;
};

export const LoadingProvider: FC<Props> = ({ children }) => {
  const loadingStatus = useProviderLoading();
  const { loading } = loadingStatus;
  return (
    <loadingContext.Provider value={loadingStatus}>
      <Progress />
      <div className={`${loading ? 'invisible' : 'block'}`}>{children}</div>
    </loadingContext.Provider>
  );
};

const useLoading = () => {
  return useContext(loadingContext);
};

const useProviderLoading = () => {
  const [loading, setLoading] = useState(initialState.loading);
  const [needLoading, setNeedLoading] = useState(initialState.needLoading);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (!needLoading) {
      id = setTimeout(() => setLoading(false), TIMEOUT);
    }

    return () => {
      id && clearTimeout(id);
    };
  }, [needLoading]);

  const handleLoadingStart = () => {
    setNeedLoading(true);

    return () => setLoading(false);
  };

  return {
    loading,
    setLoading,
    needLoading,
    setNeedLoading,
    handleLoadingStart,
  };
};

export default useLoading;
