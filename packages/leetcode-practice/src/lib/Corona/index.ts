export const calcTotalCoronaMl: (dollars: number) => number = dollars => {
  let bottles = 0;
  let caps = 0;
  let mlToPLus = 0;

  let result = 0;

  while (dollars > 0 || bottles >= 3 || caps >= 3 || mlToPLus >= 1000) {
    if (dollars) {
      const count200Ml = dollars / 1;
      dollars = 0;
      caps = caps + count200Ml;
      bottles = bottles + count200Ml;

      mlToPLus = 200 * count200Ml;
      result = result + mlToPLus;
      continue;
    }

    if (bottles >= 3) {
      const count300Ml = Math.floor(bottles / 3);
      bottles = (bottles % 3) + count300Ml;
      caps = caps + count300Ml;
      mlToPLus = mlToPLus + 300 * count300Ml;
      result = result + 300 * count300Ml;
      continue;
    }

    if (caps >= 3) {
      const count200Ml = Math.floor(caps / 3);
      bottles = bottles + count200Ml;
      caps = (caps % 3) + count200Ml;
      mlToPLus = mlToPLus + 200 * count200Ml;
      result = result + 200 * count200Ml;
      continue;
    }

    if (mlToPLus >= 1000) {
      const count300Ml = Math.floor(mlToPLus / 1000);
      bottles = bottles + count300Ml;
      caps = caps + count300Ml;
      mlToPLus = mlToPLus - 1000 * count300Ml + 300 * count300Ml;
      result = result + 300 * count300Ml;
      continue;
    }
  }

  return result;
};
