import { isAnagram } from '.';

describe('0242 Valid Anagram', () => {
  it('should work', () => {
    expect(isAnagram('anagram', 'nagaram')).toEqual(true);
    expect(isAnagram('rat', 'car')).toEqual(false);
    expect(isAnagram('ab', 'a')).toEqual(false);
  });
});
