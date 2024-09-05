import construct2DArray from './Convert1DArrayInto2DArray';

describe('2022. Convert 1D Array Into 2D Array', () => {
  test('should return 2D array', () => {
    expect(construct2DArray([1, 2, 3, 4], 2, 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);

    expect(construct2DArray([1, 2, 3], 1, 3)).toEqual([[1, 2, 3]]);
  });

  test('should return empty array', () => {
    expect(construct2DArray([1, 2], 1, 1)).toEqual([]);
  });
});
