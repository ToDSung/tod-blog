/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLastWord: (s: string) => number = s => {
  return s
    .split(' ')
    .filter(noun => noun)
    .slice(-1)[0].length;
};
