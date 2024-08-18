import { jest } from '@jest/globals';

import promiseAny from './promiseAny';

describe('promiseAny', () => {
  jest.useFakeTimers();

  test('should resolve 1', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    await expect(promiseAny(promises)).resolves.toEqual(1);
  });

  test('should resolve 2', async () => {
    const promiseA = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseB = new Promise(resolve => {
      setTimeout(() => resolve(2), 500);
    });
    const promises = [promiseA, promiseB];

    jest.advanceTimersByTime(500);
    await expect(promiseAny(promises)).resolves.toEqual(2);
  });

  test('should resolve if resolve first', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('2')), 2000)
    );
    const promises = [promiseResolve, promiseReject];

    jest.runAllTimers();
    await expect(promiseAny(promises)).resolves.toEqual(1);
  });

  test('should resolve although reject first', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = Promise.reject(new Error('2'));
    const promises = [promiseResolve, promiseReject];

    jest.runAllTimers();
    await expect(promiseAny(promises)).resolves.toEqual(1);
  });

  test('should reject if all reject', async () => {
    const promiseRejectA = new Promise((_, reject) => {
      setTimeout(() => reject(1), 1000);
    });
    const promiseRejectB = Promise.reject(new Error('2'));
    const promises = [promiseRejectA, promiseRejectB];

    jest.runAllTimers();
    await expect(promiseAny(promises)).rejects.toThrow(
      'No Promise in Promise.any was resolved'
    );
  });
});
