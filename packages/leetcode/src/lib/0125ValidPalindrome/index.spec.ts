import { isPalindrome } from '.';

describe('0125 ValidPaindrome', () => {
  it('should work', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toEqual(true);
    expect(isPalindrome('race a car')).toEqual(false);
    expect(isPalindrome(' ')).toEqual(true);
  });
});
