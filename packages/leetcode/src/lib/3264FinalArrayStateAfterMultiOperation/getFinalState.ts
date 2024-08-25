/** bruteforce */
const getFinalState = (nums: number[], k: number, multiplier: number) => {
  let loop = 0;

  while (loop < k) {
    const min = Math.min(...nums);
    const index = nums.findIndex(num => num === min);
    nums[index] = nums[index] * multiplier;
    loop++;
  }

  return nums;
};

export default getFinalState;
