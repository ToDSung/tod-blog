/**
 * @param {number[][]} image
 * @return {number[][]}
 */

export const flipAndInvertImage: (image: number[][]) => number[][] = image => {
  return image.map(list => list.reverse().map(item => (item === 0 ? 1 : 0)));
};
