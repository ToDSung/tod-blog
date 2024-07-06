import { hammingWeight } from '.';

describe('0191 Number of 1 Bits', () => {
  it('should work', () => {
    expect(hammingWeight(11)).toEqual(3);
  });
});
