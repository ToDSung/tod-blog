import { calcTotalCoronaMl } from '.';

describe('Corona', () => {
  it('should work', () => {
    expect(calcTotalCoronaMl(1)).toEqual(200);
    expect(calcTotalCoronaMl(2)).toEqual(400);
    expect(calcTotalCoronaMl(3)).toEqual(1900);
    expect(calcTotalCoronaMl(20)).toEqual(61800);
  });
});
