import { jest } from '@jest/globals';

import debounce from './debounce';

describe('debounce', () => {
  jest.useFakeTimers();

  test('should call the function only once after the specified delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should use the arguments from the last call', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledWith('third');
  });

  test('multiple calls should reset the delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();

    jest.advanceTimersByTime(500);

    debouncedFn();

    jest.advanceTimersByTime(999);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
