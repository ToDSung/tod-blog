/**
 * @param {number[]} nums
 * @return {number}
 */

export const findShortestSubArray: (nums: number[]) => number = nums => {
  const results: Record<number, {count:number; start: number}> = {};
  let result = 1;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (!(num in results)) {
      results[num] = {
        count: 1,
        start: i,
      };
    } else {
      results[num].count++;

      if (results[num].count > count) {
        count = results[num].count;
        result = i - results[num].start + 1;
      } else if (results[num].count === count) {
        const path = i - results[num].start + 1;
        if (path < result) {
          result = path;
        }
      }
    }
  }

  return result;
};
