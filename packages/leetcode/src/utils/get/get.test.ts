import lodashGet from 'lodash/get';

import get from './get';

describe('get extension', () => {
  test('orginal case', () => {
    const object = { a: [{ b: { c: 3 } }] };

    expect(get(object, 'a[0].b.c')).toBe(3);
    expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
  });

  test('extension case', () => {
    const object = { a: [{ b: { c: 3 } }] };

    expect(lodashGet(object, ['a[0]', 'b', 'c'])).toBe(undefined);
    expect(lodashGet(object, ['a[0]', 'b.c'])).toBe(undefined);
    expect(lodashGet(object, ['a', '[0].b', 'c'])).toBe(undefined);
    expect(lodashGet(object, ['a', '0', 'b.c'])).toBe(undefined);

    expect(get(object, ['a[0]', 'b', 'c'])).toBe(3);
    expect(get(object, ['a[0]', 'b.c'])).toBe(3);
    expect(get(object, ['a', '[0].b', 'c'])).toBe(3);
    expect(get(object, ['a', '0', 'b.c'])).toBe(3);
  });

  test('edge case', () => {
    const object = { '.': [{ '[': { ']4': 3 } }] };
    expect(lodashGet(object, ['.', '0', '[', ']4'])).toBe(3);
    // Still need to modify the function to specifically handle these edge cases.
    // expect(get(object, ['.', '0', '[', ']4'])).toBe(3);
  });
});
