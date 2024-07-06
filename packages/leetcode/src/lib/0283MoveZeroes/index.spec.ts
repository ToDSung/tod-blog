import { moveZeroes } from '.';

describe('0283 Move Zeroes', () => {
  it('should work', () => {
    expect(moveZeroes([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0]);
    expect(moveZeroes([0])).toEqual([0]);
  });
});
