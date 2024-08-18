import { jest } from '@jest/globals';

import promiseAllSettled from './promiseAllSettled';

describe('promiseAllSettled', () => {
  jest.useFakeTimers();

  test('should resolve [1, 2]', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    await expect(promiseAllSettled(promises)).resolves.toEqual([
      { status: 'resolved', value: 1 },
      { status: 'resolved', value: 2 },
    ]);
  });

  test('should resolve [1, 2] after 1000', async () => {
    const promiseA = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseB = new Promise(resolve => {
      setTimeout(() => resolve(2), 500);
    });
    const promises = [promiseA, promiseB];

    jest.advanceTimersByTime(1000);
    await expect(promiseAllSettled(promises)).resolves.toEqual([
      { status: 'resolved', value: 1 },
      { status: 'resolved', value: 2 },
    ]);
  });

  test('should resolve with two diff return type', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('2')), 2000)
    );
    const promises = [promiseResolve, promiseReject];

    jest.runAllTimers();
    await expect(promiseAllSettled(promises)).resolves.toEqual([
      { status: 'resolved', value: 1 },
      { status: 'rejected', reason: new Error('2') },
    ]);
  });
});
