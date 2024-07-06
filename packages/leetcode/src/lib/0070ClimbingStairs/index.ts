/**
 * @param {number} n
 * @return {number}
 */

interface memorized {
  [key: number]: number;
}

// Fibonacci
export const climbStairs: (n: number) => number = n => {
  // recursive
  // const memorized: memorized = {
  //   0: 1,
  //   1: 1,
  // };
  // if (memorized[n]) {
  //   return memorized[n];
  // }
  // memorized[n] = climbStairs(n - 2) + climbStairs(n - 1);
  // return memorized[n];

  // iteration

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  let prev = 1;
  let prev2 = 2;

  for (let i = 3; i <= n; i++) {
    if (prev < prev2) {
      prev = prev + prev2;
    } else {
      prev2 = prev + prev2;
    }
  }

  return prev > prev2 ? prev : prev2;
};
