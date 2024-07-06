import { diStringMatch } from '.';

describe('0697 DI String Match', () => {
  it('should work', () => {
    expect(diStringMatch('IDID')).toEqual([0, 4, 1, 3, 2]);
    expect(diStringMatch('III')).toEqual([0, 1, 2, 3]);
    expect(diStringMatch('DDI')).toEqual([3, 2, 0, 1]);
  });
});
