/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
export const addBinary: (a: string, b: string) => string = (a, b) => {
  const add: (smallList: string[], largeList: string[]) => string = (
    smallList,
    largeList
  ) => {
    let carry = 0;
    const reversedSmallList = smallList.reverse();
    const reversedLargeList = largeList.reverse();

    const result: string[] = [];

    reversedLargeList.forEach((item, index) => {
      const largeItem = +item;
      const smallItem = isNaN(+reversedSmallList[index])
        ? 0
        : +reversedSmallList[index];

      let currentResult = smallItem + largeItem;
      if (carry) {
        currentResult = currentResult + carry;
      }

      if (currentResult === 3) {
        result.push('1');
      } else if (currentResult === 2) {
        if (!carry) {
          carry = 1;
        }
        result.push('0');
      } else if (currentResult === 1) {
        if (carry) {
          carry = 0;
        }
        result.push('1');
      } else {
        result.push('0');
      }
    });

    if (carry) {
      result.push('1');
    }

    return result.reverse().join('');
  };

  const listA = a.split('');
  const listB = b.split('');

  if (listA.length <= listB.length) {
    return add(listA, listB);
  } else {
    return add(listB, listA);
  }
};
