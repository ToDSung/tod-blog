/**
 * @param {number} rowIndex
 * @return {number[]}
 */
export const getRow: (rowIndex: number) => number[] = rowIndex => {
  if (rowIndex === 0) {
    return [1];
  }

  if (rowIndex === 1) {
    return [1, 1];
  }

  let last = [1, 1];

  for (let i = 0; i <= rowIndex - 2; i++) {
    const currentRows = [];

    for (let j = 0; j <= i; j++) {
      const middleNumber = last[j] + last[j + 1];
      currentRows.push(middleNumber);
    }

    last = [1, ...currentRows, 1];
  }

  return last;
};
