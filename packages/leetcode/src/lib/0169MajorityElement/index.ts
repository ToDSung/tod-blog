/**
 * @param {number[]} nums
 * @return {number}
 */
export const majorityElement: (nums: number[]) => number = nums => {
  // Time Complexity: O(n*log(n))
  // Space Complextiy: O(1)

  // return nums
  //   .sort((prev, next) => prev - next)
  //   .slice(Math.floor(nums.length / 2))[0];

  // Moore voting algorithm

  // Time Complexity: O(n)
  // Space Complextiy: O(1)

  let major = -1;
  let count = 0;

  nums.forEach(num => {
    if (count === 0) {
      major = num;
      count = 1;
    } else if (count >= 0) {
      count = major === num ? count + 1 : count - 1;
    }
  });

  return major;
};
