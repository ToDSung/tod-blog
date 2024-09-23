import findSecondLargest from './findSecondLargest';

describe('find second largest', () => {
  test('if no second largest', () => {
    expect(findSecondLargest([])).toBe(undefined);
    expect(findSecondLargest([3])).toBe(undefined);
    expect(findSecondLargest([3, 3])).toBe(undefined);
  });

  test('should Equal', () => {
    expect(findSecondLargest([3, 3, 2, 1])).toBe(2);
    expect(findSecondLargest([3, 3, 4, 2, 1])).toBe(3);
  });
});
