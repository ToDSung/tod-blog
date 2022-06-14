/**
 * @param {number} numRows
 * @return {number[][]}
 */
export const generate: (numRows: number) => number[][] = numRows => {
  if (numRows === 1) {
    return [[1]];
  }

  if (numRows === 2) {
    return [[1], [1, 1]];
  }

  let last = [1, 1];
  const result = [[1], last];

  for (let i = 0; i < numRows - 2; i++) {
    const currentRows = [];

    for (let j = 0; j <= i; j++) {
      const middleNumber = last[j] + last[j + 1];
      currentRows.push(middleNumber);
    }

    last = [1, ...currentRows, 1];
    result.push(last);
  }
  return result;
};
