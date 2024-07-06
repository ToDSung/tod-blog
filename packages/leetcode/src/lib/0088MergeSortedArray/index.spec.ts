import { merge } from '.';

describe('0070 Climbing Stairs', () => {
  it('should work', () => {
    expect(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)).toEqual([
      1, 2, 2, 3, 5, 6,
    ]);
    expect(merge([0], 0, [1], 1)).toEqual([1]);
    expect(merge([1], 1, [], 0)).toEqual([1]);
    expect(merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });
});
