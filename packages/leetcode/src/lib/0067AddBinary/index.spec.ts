import { addBinary } from '.';

describe('0027 Remove Element', () => {
  it('should work', () => {
    expect(addBinary('11', '1')).toEqual('100');
    expect(addBinary('1010', '1011')).toEqual('10101');
  });
});
