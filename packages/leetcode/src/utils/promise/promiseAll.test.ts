import { jest } from '@jest/globals';

import promiseAll from './promiseAll';

describe('promiseAll', () => {
  jest.useFakeTimers();

  test('should resolve [1, 2]', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    await expect(promiseAll(promises)).resolves.toEqual([1, 2]);
  });

  test('should resolve [1, 2] inorder', async () => {
    const promiseA = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseB = new Promise(resolve => {
      setTimeout(() => resolve(2), 500);
    });
    const promises = [promiseA, promiseB];

    jest.runAllTimers();
    await expect(promiseAll(promises)).resolves.toEqual([1, 2]);
  });

  test('should reject if any promise rejects', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = Promise.reject(new Error('2'));
    const promises = [promiseResolve, promiseReject];

    await expect(promiseAll(promises)).rejects.toThrow('2');
  });

  test('should reject if any promise delay rejects', async () => {
    const promiseResolve = new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    });
    const promiseReject = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('2')), 2000)
    );
    const promises = [promiseResolve, promiseReject];

    jest.runAllTimers();
    await expect(promiseAll(promises)).rejects.toThrow('2');
  });
});
