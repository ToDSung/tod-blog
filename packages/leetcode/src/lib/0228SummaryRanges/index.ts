/**
 * @param {number[]} nums
 * @return {string[]}
 */
export const summaryRanges: (nums: number[]) => string[] = nums => {
  let left = nums[0];
  let right = nums[0];
  const results: string[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 === nums[i + 1]) {
      right = nums[i + 1];
    } else if (left < right) {
      results.push(left + '->' + right);
      left = nums[i + 1];
    } else {
      results.push(left + '');
      left = nums[i + 1];
    }
  }

  return results;
};
