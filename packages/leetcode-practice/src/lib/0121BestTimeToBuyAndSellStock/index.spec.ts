import { maxProfit } from '.';

describe('0121 Best Time to Buy and Sell Stock', () => {
  it('should work', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(5);
    expect(maxProfit([7, 6, 4, 3, 1])).toEqual(0);
    expect(maxProfit([2, 1, 4])).toEqual(3);
    expect(maxProfit([2, 11, 1, 4, 7])).toEqual(9);
    expect(maxProfit([4, 7, 2, 1])).toEqual(3);
  });
});
