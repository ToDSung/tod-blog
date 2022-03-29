const ID_LIMIT: number = 1000;

export const getRandomImageUrl = (index: number) => {
  const randomIdList = [...Array(ID_LIMIT)]
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);

  return `https://picsum.photos/id/${randomIdList[index]}/900/1200`;
};
