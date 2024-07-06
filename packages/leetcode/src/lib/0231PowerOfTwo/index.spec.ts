import { isPowerOfTwo } from '.';

describe('0219 Contains Duplicate II', () => {
  it('should work', () => {
    expect(isPowerOfTwo(1)).toEqual(true);
    expect(isPowerOfTwo(16)).toEqual(true);
    expect(isPowerOfTwo(3)).toEqual(false);
  });
});
