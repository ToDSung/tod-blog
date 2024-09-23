import bubbleSort from './bubbleSort';

describe('bubble sort', () => {
  test('should pass', () => {
    expect(bubbleSort([])).toStrictEqual([]);
    expect(bubbleSort([1])).toStrictEqual([1]);
    expect(bubbleSort([5, 1, 3, 2, 4])).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
