/**
 * @param {string} columnTitle
 * @return {number}
 */
export const titleToNumber: (columnTitle: string) => number = columnTitle => {
  const letters: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  return columnTitle
    .split('')
    .reverse()
    .reduce((accumulator, letter, index) => {
      return accumulator + (letters.indexOf(letter) + 1) * Math.pow(26, index);
    }, 0);
};
