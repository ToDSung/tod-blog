/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

interface wordMap {
  [key: string]: string;
}

export const wordPattern: (pattern: string, s: string) => boolean = (
  pattern,
  s
) => {
  const wordMap: wordMap = {};

  const patternList = pattern.split('');
  const sList = s.split(' ');

  if (patternList.length !== sList.length) {
    return false;
  }

  for (let i = 0; i < patternList.length; i++) {
    const word = patternList[i];
    if (Object.prototype.hasOwnProperty.call(wordMap, word)) {
      if (wordMap[word] !== sList[i]) {
        return false;
      }
    } else {
      if (Object.values(wordMap).includes(sList[i])) {
        return false;
      }

      wordMap[word] = sList[i];
    }
  }

  return true;
};
