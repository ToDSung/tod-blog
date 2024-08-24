import lemonadeChange from './LemonadeChange';

describe('0860 Lemonade Change', () => {
  test('should success with [5, 5, 5, 10, 20]', () => {
    expect(lemonadeChange([5, 5, 5, 10, 20])).toBe(true);
  });

  test('should fail with [5, 5, 10, 10, 20]', () => {
    expect(lemonadeChange([5, 5, 10, 10, 20])).toBe(false);
  });

  test('should replace 10 with 2 $5 coin', () => {
    expect(
      lemonadeChange([
        5, 5, 10, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 20, 5, 20, 5,
      ])
    ).toBe(true);
  });
});
