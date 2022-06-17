/**
 * @param {number} n - a positive integer
 * @return {number}
 */
export const hammingWeight: (n: number) => number = n => {
  // return n
  //   .toString(2)
  //   .split('')
  //   .filter(val => val === '1').length;

  return n.toString(2).split('1').length - 1;
};
