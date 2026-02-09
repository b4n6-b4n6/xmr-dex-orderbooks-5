import divideBigInts from './divideBigInts';

const relativeness = (a, b) => {
  return Number(divideBigInts(a, b)) / 100 - 100;
};

export default relativeness;
