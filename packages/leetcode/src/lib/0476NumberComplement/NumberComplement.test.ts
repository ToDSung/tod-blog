import findComplementArray from './NumberComplementArray';
import findComplementString from './NumberComplementString';

describe('0476 Number Complment', () => {
  test('complement 5 should be 2', () => {
    expect(findComplementString(5)).toBe(2);
    expect(findComplementArray(5)).toBe(2);
  });

  test('complement 2 should be 1', () => {
    expect(findComplementString(2)).toBe(1);
    expect(findComplementArray(5)).toBe(2);
  });

  test('complement 1 should be 0', () => {
    expect(findComplementString(1)).toBe(0);
    expect(findComplementArray(5)).toBe(2);
  });
});
