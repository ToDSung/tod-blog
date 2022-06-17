import { titleToNumber } from '.';

describe('0171 Excel Sheet Column Number', () => {
  it('should work', () => {
    expect(titleToNumber('A')).toEqual(1);
    expect(titleToNumber('AB')).toEqual(28);
    expect(titleToNumber('ZY')).toEqual(701);
  });
});
