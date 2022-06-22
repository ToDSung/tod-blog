/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export const isAnagram: (s: string, t: string) => boolean = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const tList = t.split('').sort();
  const sList = s.split('').sort();

  for (let i = 0; i < sList.length; i++) {
    if (sList[i] !== tList[i]) {
      return false;
    }
  }

  return true;
};
