import { majorityElement } from '.';

describe('0168 Excel Sheet Column Title', () => {
  it('should work', () => {
    expect(majorityElement([3, 2, 3])).toEqual(3);
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toEqual(2);
  });
});
