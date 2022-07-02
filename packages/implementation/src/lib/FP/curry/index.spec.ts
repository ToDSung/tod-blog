import { curry } from '.';

describe('curry', () => {
  it('should work', () => {
    const add: (a: number, b: number, c: number) => number = (a, b, c) =>
      a + b + c;

    const curryAdd = curry(add);

    expect(curryAdd(2, 3, 5)).toEqual(10);
    expect(curryAdd(2, 3)(5)).toEqual(10);
    expect(curryAdd(2)(3, 5)).toEqual(10);
    expect(curryAdd(2)(3)(5)).toEqual(10);
  });
});
