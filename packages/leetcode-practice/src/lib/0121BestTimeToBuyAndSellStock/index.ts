/**
 * @param {number[]} prices
 * @return {number}
 */

export const maxProfit: (prices: number[]) => number = prices => {
  // Time Complexity: O(nlogn)
  // let result = 0;
  // for (let i = 0; i < prices.length; i++) {
  //   for (let j = i + 1; j < prices.length; j++) {
  //     const priceBuy = prices[i];
  //     const priceSell = prices[j];
  //     const profit = priceSell - priceBuy;
  //     result = profit > result ? profit : result;
  //   }
  // }
  // return result;

  if (prices.length === 1) {
    return 0;
  }
  // minValue maxValue 都從 0 開始
  // 找到比 minValue 更小的值就 maxValue = 下一個值 並且
  // 比 maxValue 更大的值重新計算 result

  let priceBuy = prices[0];
  let priceSell = prices[0];
  let result = 0;

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    if (price < priceBuy) {
      priceBuy = price;
      priceSell = prices[i + 1];

      if (priceSell) {
        const profit = priceSell - priceBuy;
        result = profit > result ? profit : result;
      }
    }

    if (price > priceSell) {
      priceSell = price;
      const profit = priceSell - priceBuy;
      result = profit > result ? profit : result;
    }
  }

  return result;
};
