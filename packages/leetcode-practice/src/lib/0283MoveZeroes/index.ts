/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export const moveZeroes: (nums: number[]) => number[] = function (nums) {
  const queue: number[] = [];

  nums.forEach((num, index) => {
    if (queue.length) {
      if (num) {
        const shiftNumber = queue.shift() as number;
        nums[shiftNumber] = nums[index];
        nums[index] = 0;
      }
      queue.push(index);
    } else {
      if (!num) {
        queue.push(index);
      }
    }
  });

  return nums;
};
