/**
 * @param {string} s
 * @return {boolean}
 */
export const isPalindrome: (s: string) => boolean = s => {
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]/gi, '');
  const reversedS = s.split('').reverse().join('');
  return s === reversedS;
};
