/**
 * @param {number[]} nums
 * @return {number}
 */

// Dynamic Programming

export const maxSubArray: (nums: number[]) => number = nums => {
  let result = nums[0];
  let currrent = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currrent += nums[i];

    if (currrent < 0 || nums[i] > currrent) {
      currrent = nums[i];
    }

    if (result < currrent) {
      result = currrent;
    }
  }
  return result;
};
