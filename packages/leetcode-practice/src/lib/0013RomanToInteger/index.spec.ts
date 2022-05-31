import { romanToNumber } from '.';

describe('0013 Roman to Integer', () => {
  it('should work', () => {
    expect(romanToNumber('III')).toEqual(3);
    expect(romanToNumber('LVIII')).toEqual(58);
    expect(romanToNumber('MCMXCIV')).toEqual(1994);
  });
});
