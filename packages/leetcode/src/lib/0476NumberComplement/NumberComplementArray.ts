const toBinary = (num: number) => {
  const binaryArray = [];

  while (num > 0) {
    binaryArray.push(num % 2);
    num = Math.floor(num / 2);
  }

  return binaryArray;
};

const complement = (binaryArray: number[]) => {
  return binaryArray.map(bit => (bit === 0 ? 1 : 0));
};

const toDecimal = (binaryArray: number[]) => {
  const decimal = binaryArray.reduce((acc, bit, index) => {
    return (acc += +bit * Math.pow(2, index));
  }, 0);

  return decimal;
};

const findComplement = (num: number) => {
  const binary = toBinary(num);
  const complementedBinary = complement(binary);
  const complementedNumber = toDecimal(complementedBinary);
  return complementedNumber;
};

export default findComplement;
