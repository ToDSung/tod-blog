import { reverseBits } from '.';

describe('0190 Reverse Bits', () => {
  it('should work', () => {
    expect(reverseBits(43261596)).toEqual(964176192);
  });
});
