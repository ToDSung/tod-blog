/**
 * @param {number} num
 * @return {number}
 */
export const addDigits: (num: number) => number = num => {
  while (`${num}`.length > 1) {
    num = `${num}`
      .split('')
      .reduce((accumulator, letter) => accumulator + +letter, 0);
  }

  return num;
};
