import { summaryRanges } from '.';

describe('0219 Contains Duplicate II', () => {
  it('should work', () => {
    expect(summaryRanges([0, 1, 2, 4, 5, 7])).toEqual(['0->2', '4->5', '7']);
    expect(summaryRanges([0, 2, 3, 4, 6, 8, 9])).toEqual([
      '0',
      '2->4',
      '6',
      '8->9',
    ]);
    expect(summaryRanges([-1])).toEqual(['-1']);
  });
});
