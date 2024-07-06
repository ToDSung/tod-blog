export const diStringMatch: (s: string) => number[] = s => {
  const sList = s.split('');
  let first = 0;
  let end = sList.length;

  const result: number[] = [];
  sList.forEach(item => {
    if (item === 'I') {
      result.push(first);
      first = first + 1;
    } else {
      result.push(end);
      end = end - 1;
    }
  });

  result.push(first);

  return result;
};
