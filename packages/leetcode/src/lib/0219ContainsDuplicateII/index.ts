/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
export const containsNearbyDuplicate: (nums: number[], k: number) => boolean = (
  nums,
  k
) => {
  if (nums.length - k - 1 <= 0) {
    return [...new Set(nums)].length !== nums.length;
  }

  // Time Limit Exceeded

  // for (let i = 0; i <= nums.length - k - 1; i++) {
  //   const slicedNums = nums.slice(i, i + k + 1);
  //   if ([...new Set(slicedNums)].length !== slicedNums.length) {
  //     return true;
  //   }
  // }

  const set = new Set(nums.slice(0, k + 1));

  for (let i = k + 1; i <= nums.length - 1; i++) {
    if (set.size !== k + 1) {
      return true;
    }

    set.delete(nums[i - k - 1]);

    if (set.has(nums[i])) {
      return true;
    }

    set.add(nums[i]);
  }

  return false;
};
