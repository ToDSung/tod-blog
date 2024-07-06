import { searchInsert } from '.';

describe('0035 Search Insert Position', () => {
  it('should work', () => {
    expect(searchInsert([1, 3, 5, 6], 0)).toEqual(0);
    expect(searchInsert([1, 3, 5, 6], 1)).toEqual(0);
    expect(searchInsert([1, 3, 5, 6], 2)).toEqual(1);
    expect(searchInsert([1, 3, 5, 6], 3)).toEqual(1);
    expect(searchInsert([1, 3, 5, 6], 4)).toEqual(2);
    expect(searchInsert([1, 3, 5, 6], 5)).toEqual(2);
    expect(searchInsert([1, 3, 5, 6], 6)).toEqual(3);
    expect(searchInsert([1, 3, 5, 6], 7)).toEqual(4);
  });
});
