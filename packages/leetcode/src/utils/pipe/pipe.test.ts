import pipe from './pipe';

describe('pipe', () => {
  test('basic', () => {
    const add1 = (value: number) => value + 1;
    const add2 = (value: number) => value + 2;
    const add3 = pipe(add1, add2);

    expect(add3(1)).toBe(4);
  });

  test('with type Change', () => {
    const add1 = (value: number) => value + 1;
    const toString = (value: number) => value.toString();
    const add1AndToString = pipe(add1, toString);

    expect(add1AndToString(1)).toBe('2');
  });
});
