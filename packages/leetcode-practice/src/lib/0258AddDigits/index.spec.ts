import { addDigits } from '.';

describe('0258 Add Digits', () => {
  it('should work', () => {
    expect(addDigits(38)).toEqual(2);
    expect(addDigits(0)).toEqual(0);
  });
});
