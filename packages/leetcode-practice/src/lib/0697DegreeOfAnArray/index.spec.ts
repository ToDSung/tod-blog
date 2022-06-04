import { findShortestSubArray } from '.';

describe('0697 Degree of an Array', () => {
  it('should work', () => {
    expect(findShortestSubArray([1, 2, 2, 3, 1])).toEqual(2);
    expect(findShortestSubArray([1, 2, 2, 3, 1, 4, 2])).toEqual(6);
    expect(
      findShortestSubArray([2, 1, 1, 2, 1, 3, 3, 3, 1, 3, 1, 3, 2])
    ).toEqual(7);
  });
});
