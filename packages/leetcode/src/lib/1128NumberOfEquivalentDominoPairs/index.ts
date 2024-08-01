export const numEquivDominoPairs = (dominoes: number[][]): number => {
  const map = new Map<string, number>()
  let result = 0

  for (let index = 0; index < dominoes.length; index++) {
      const [i, j] = dominoes[index]
      // 例如 [1, 111] [11, 11] 的結果都會是 1111 所以 key 不能直接 concat
      const key = i <= j ? `${i}_${j}` : `${j}_${i}`
      const value = map.get(key)
      if (value) {
          // 考慮的是階層的概念 如果有 2 組則 +1 如果有 3 組 則可以跟前兩組 map 所以要 +2
          result += value
          map.set(key, value + 1)
      } else {
          map.set(key, 1)
      }
  }

  return result
};
