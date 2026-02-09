/* global BigInt */

const bustCache = () => {
  return `?nocache=${Math.round(Math.random * 0xffffffff)}`;
};

export default bustCache;
