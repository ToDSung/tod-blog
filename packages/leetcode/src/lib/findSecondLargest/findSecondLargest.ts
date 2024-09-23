const isUndefined = (value: number | undefined): value is undefined =>
  value === undefined;

const findSecondLargest = (list: number[]) => {
  if (list.length <= 1) return undefined;

  let largest: number | undefined;
  let secondLargest: number | undefined;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    if (isUndefined(largest)) {
      largest = item;
      continue;
    }

    if (item > largest) {
      secondLargest = largest;
      largest = item;
      continue;
    }

    const isEqualWithLargest = largest === item;
    if (
      (!isEqualWithLargest && isUndefined(secondLargest)) ||
      (!isUndefined(secondLargest) && item > secondLargest)
    ) {
      secondLargest = item;
    }
  }

  return secondLargest;
};

export default findSecondLargest;
