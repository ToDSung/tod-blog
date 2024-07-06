import { isHappy } from '.';

describe('0202 Happy Number', () => {
  it('should work', () => {
    expect(isHappy(19)).toEqual(true);
    expect(isHappy(2)).toEqual(false);
    expect(isHappy(13)).toEqual(true);
    expect(isHappy(7)).toEqual(true);
  });
});
