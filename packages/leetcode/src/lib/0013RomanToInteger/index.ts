interface stringToNumber {
  [key: string]: number;
}

export const romanToNumber = (symbol: string): number => {
  const normals: stringToNumber = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const substactions: stringToNumber = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };

  const letters = symbol.split('');

  let result = 0;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];

    if (['I', 'X', 'C'].includes(letter)) {
      const plus: keyof stringToNumber = `${letter}${letters[i + 1]}`;
      const substactionCase = substactions[plus];

      if (substactionCase) {
        result += substactionCase;
        i += 1;
        continue;
      }
    }

    result += normals[letter];
  }

  return result;
};

export default romanToNumber;
