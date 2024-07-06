import { wordPattern } from '.';

describe('0290 Word Pattern', () => {
  it('should work', () => {
    expect(wordPattern('abba', 'dog cat cat dog')).toEqual(true);
    expect(wordPattern('abba', 'dog cat cat fish')).toEqual(false);
    expect(wordPattern('aaaa', 'dog cat cat dog')).toEqual(false);
    expect(wordPattern('abba', 'dog dog dog dog')).toEqual(false);
    expect(wordPattern('aaa', 'aa aa aa aa')).toEqual(false);
  });
});
