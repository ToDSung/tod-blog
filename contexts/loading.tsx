import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Transition } from '@headlessui/react';

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
      <Transition show={loading} leave='duration-1000'>
        <Progress show={loading} />
      </Transition>
      <Transition show={!loading} enter='duration-1000'>
        {children}
      </Transition>
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
