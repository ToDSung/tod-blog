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

const TIMEOUT = 2000;

type initialState = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState: initialState = {
  loading: true,
  setLoading: () => {},
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
      {loading && <Progress />}
      {children}
    </loadingContext.Provider>
  );
};

const useLoading = () => {
  return useContext(loadingContext);
};

const useProviderLoading = () => {
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    setTimeout(() => setLoading(false), TIMEOUT);
  }, []);

  return {
    loading,
    setLoading,
  };
};

export default useLoading;
