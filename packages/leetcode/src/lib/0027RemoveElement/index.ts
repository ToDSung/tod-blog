/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

export const removeElement = (nums: number[], val: number) => {
  let result = 0;
  nums.forEach((num, index) => {
    if (num !== val) {
      nums[result++] = nums[index];
    }
  });
  return result;
};
