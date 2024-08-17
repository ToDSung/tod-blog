import { jest } from '@jest/globals';

import throttle from './throttle';

describe('throttle', () => {
  jest.useFakeTimers();

  test('should call the function immediately only once', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    // First call - should execute immediately
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    // These calls should be throttled
    throttledFn();
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward time by 500ms
    jest.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward time to 1000ms
    jest.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(2);

    // Additional call after delay
    throttledFn();
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test('should use the arguments from the first and last call', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn('first');
    throttledFn('second');
    throttledFn('third');

    expect(mockFn).toHaveBeenCalledWith('first');
    expect(mockFn).toHaveBeenCalledTimes(1);

    jest.runAllTimers();

    expect(mockFn).not.toHaveBeenCalledWith('second');
    expect(mockFn).toHaveBeenCalledWith('third');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
