import { climbStairs } from '.';

describe('0070 Climbing Stairs', () => {
  it('should work', () => {
    expect(climbStairs(2)).toEqual(2);
    expect(climbStairs(3)).toEqual(3);
    expect(climbStairs(4)).toEqual(5);
    expect(climbStairs(5)).toEqual(8);
  });
});
