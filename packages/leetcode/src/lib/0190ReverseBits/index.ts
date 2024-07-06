/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
export const reverseBits: (n: number) => number = n => {
  return parseInt(
    n.toString(2).padStart(32, '0').split('').reverse().join(''),
    2
  );
};
