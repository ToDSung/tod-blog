import { numEquivDominoPairs  } from '.';

describe('0697 Number of Equivalent Domino Pairs', () => {
  it('should work', () => {
    expect(numEquivDominoPairs([[1,2],[2,1],[3,4],[5,6]])).toEqual(1);
    expect(numEquivDominoPairs([[1,2],[1,2],[1,1],[1,2],[2,2]])).toEqual(3);
  });
});
