import { jest } from '@jest/globals';

import promiseRace from './promiseRace';

describe('promiseRace', () => {
  jest.useFakeTimers();

  test('should resolve 1', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    await expect(promiseRace(promises)).resolves.toEqual(1);
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
    await expect(promiseRace(promises)).resolves.toEqual(2);
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
    await expect(promiseRace(promises)).resolves.toEqual(1);
  });

  test('should reject if reject first', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = Promise.reject(new Error('2'));
    const promises = [promiseResolve, promiseReject];

    await expect(promiseRace(promises)).rejects.toThrow('2');
  });
});
