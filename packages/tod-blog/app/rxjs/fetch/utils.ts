import { from, of } from 'rxjs';

// Types
export interface ApiResponse {
  data: number[];
  timestamp: number;
}

export interface FetchState {
  data: ApiResponse[];
  isLoading: boolean;
}

export const timeout = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const mockApi1 = async (): Promise<ApiResponse> => {
  console.log('Api 1 received');
  await timeout(3000);
  console.log('Api 1 finished');
  return {
    data: [1, 2, 3],
    timestamp: Date.now(),
  };
};

export const api1$ = () => from(mockApi1());

const mockApi2 = async (): Promise<ApiResponse> => {
  console.log('Api 2 received');
  await timeout(1000);
  console.log('Api 2 finished');
  return {
    data: [4, 5, 6],
    timestamp: Date.now(),
  };
};

export const api2$ = () => from(mockApi2());

const mockApi3 = (): ApiResponse => {
  console.log('Api 3 received');
  console.log('Api 3 finished');
  return {
    data: [7, 8, 9],
    timestamp: Date.now(),
  };
};

export const api3$ = () => of(mockApi3());
