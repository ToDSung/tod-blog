/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// binarySearch

export const searchInsert: (nums: number[], target: number) => number = (
  nums,
  target
) => {
  if (!nums.length) {
    return 0;
  }

  let start = 0;
  let end = nums.length - 1;
  let index = -1;

  while (start <= end) {
    index = Math.floor((start + end) / 2);
    if (nums[index] == target) {
      return index;
    }
    if (nums[index] >= target) {
      end = index - 1;
    } else {
      start = index + 1;
    }
  }
  return start;
};
