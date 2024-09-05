const construct2DArray = (original: number[], m: number, n: number) => {
  if (original.length !== m * n) return [];

  const result = [];

  for (let i = 0; i < m; i++) {
    result.push(original.slice(n * i, n * i + n));
  }

  return result;
};

export default construct2DArray;
