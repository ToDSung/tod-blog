/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

interface replacedStrings {
  [key: string]: string;
}

export const isIsomorphic: (s: string, t: string) => boolean = (s, t) => {
  if ([...new Set(s)].length !== [...new Set(t)].length) return false;

  const replacedStrings: replacedStrings = {};

  const sList = s.split('');
  const tList = t.split('');

  for (let i = 0; i <= sList.length; i++) {
    const letter = sList[i];
    if (!replacedStrings[letter]) {
      replacedStrings[letter] = tList[i];
    }

    if (replacedStrings[letter] !== tList[i]) {
      return false;
    }
  }

  return true;
};
