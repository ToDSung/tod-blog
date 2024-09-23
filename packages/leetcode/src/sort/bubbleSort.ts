const bubbleSort = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const prev = list[i];
      const next = list[j];

      if (prev > next) {
        list[i] = next;
        list[j] = prev;
      }
    }
  }

  return list;
};

export default bubbleSort;
