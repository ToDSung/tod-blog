import { isValid } from '.';

describe('0020 Valid Parentheses', () => {
  it('should work', () => {
    expect(isValid('(')).toEqual(false);
    expect(isValid('()')).toEqual(true);
    expect(isValid('()[]{}')).toEqual(true);
    expect(isValid('(]')).toEqual(false);
    expect(isValid('{[]}')).toEqual(true);
    expect(isValid('{[]}()')).toEqual(true);
    expect(isValid('((')).toEqual(false);
  });
});
