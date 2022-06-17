import { convertToTitle } from '.';

describe('0168 Excel Sheet Column Title', () => {
  it('should work', () => {
    expect(convertToTitle(1)).toEqual('A');
    expect(convertToTitle(28)).toEqual('AB');
    expect(convertToTitle(675)).toEqual('YY');
    expect(convertToTitle(701)).toEqual('ZY');
  });
});
