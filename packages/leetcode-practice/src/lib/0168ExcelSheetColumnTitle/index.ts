/**
 * @param {number} columnNumber
 * @return {string}
 */

const letters: string[] = [
  'Z',
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
];

export const convertToTitle: (
  columnNumber: number
) => string = columnNumber => {
  let result = '';

  while (columnNumber > 0) {
    const remainder = columnNumber % 26;
    result = letters[remainder] + result;
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }

  return result;
};
