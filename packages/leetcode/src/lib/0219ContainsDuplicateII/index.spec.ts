import { containsNearbyDuplicate } from '.';

describe('0219 Contains Duplicate II', () => {
  it('should work', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toEqual(true);
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toEqual(true);
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toEqual(false);
    expect(containsNearbyDuplicate([99, 99], 2)).toEqual(true);
    expect(containsNearbyDuplicate([1, 1, 1, 1], 2)).toEqual(true);
  });
});
