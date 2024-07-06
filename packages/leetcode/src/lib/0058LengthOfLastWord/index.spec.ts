import { lengthOfLastWord } from '.';

describe('0027 Remove Element', () => {
  it('should work', () => {
    expect(lengthOfLastWord('Hello World')).toEqual(5);
    expect(lengthOfLastWord('   fly me   to   the moon  ')).toEqual(4);
    expect(lengthOfLastWord('luffy is still joyboy')).toEqual(6);
  });
});
