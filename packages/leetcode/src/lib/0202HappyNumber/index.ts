/**
 * @param {number} n
 * @return {boolean}
 */

export const isHappy: (n: number) => boolean = n => {
  const results = new Set();

  while (n) {
    const result = `${n}`
      .split('')
      .reduce(
        (accumulator, current) => accumulator + parseInt(current) ** 2,
        0
      );

    if (result === 1) {
      return true;
    }

    if (results.has(result)) {
      return false;
    }

    results.add(result);
    n = result;
  }

  return false;
};
