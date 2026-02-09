/* global BigInt */

const divideBigInts = (a, b, precision = 4) => {
  return (a * BigInt(10 ** precision)) / b;
};

export default divideBigInts;
