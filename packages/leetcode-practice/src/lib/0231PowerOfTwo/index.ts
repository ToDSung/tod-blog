/**
 * @param {number} n
 * @return {boolean}
 */
export const isPowerOfTwo: (n: number) => boolean = n => {
  if (n <= 0) {
    return false;
  }

  while (n !== 1) {
    if (n % 2 === 1) {
      return false;
    }
    n = n / 2;
  }
  return true;
};
