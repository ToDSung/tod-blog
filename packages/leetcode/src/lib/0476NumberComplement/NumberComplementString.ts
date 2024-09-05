const toBinary = (num: number) => {
  let binary = '';

  while (num > 0) {
    binary = `${num % 2}${binary}`;
    num = Math.floor(num / 2);
  }

  return binary;
};

const complement = (binary: string) => {
  let complemented = '';

  for (let i = 0; i < binary.length; i++) {
    const appendWord = binary[i] === '0' ? '1' : '0';
    complemented = `${complemented}${appendWord}`;
  }

  return complemented;
};

const toDecimal = (binary: string) => {
  let decimal = 0;

  for (let i = 0; i < binary.length; i++) {
    decimal += +binary[i] * Math.pow(2, binary.length - 1 - i);
  }

  return decimal;
};

const findComplement = (num: number) => {
  const binary = toBinary(num);
  const complementedBinary = complement(binary);
  const complementedNumber = toDecimal(complementedBinary);
  return complementedNumber;
};

export default findComplement;
