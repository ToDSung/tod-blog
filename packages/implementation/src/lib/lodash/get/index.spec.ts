import { get } from '.';

describe('implementation lodash get', () => {
  it('should work', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'a[0].b.c')).toEqual(3);
    expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
    expect(get(object, 'a.b.c', 'default')).toEqual('default');
  });
});
