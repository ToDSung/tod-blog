import { isIsomorphic } from '.';

describe('0205 Isomorphic Strings', () => {
  it('should work', () => {
    expect(isIsomorphic('egg', 'add')).toEqual(true);
    expect(isIsomorphic('foo', 'bar')).toEqual(false);
    expect(isIsomorphic('paper', 'title')).toEqual(true);
    expect(isIsomorphic('badc', 'baba')).toEqual(false);
  });
});
