/* global BigInt */

const btcToSat = (btc) => {
  if (!/^\d+\.\d{8}$/.test(btc)) {
    console.error(`'${btc}'`);
    throw new Error('bad format in btcToSat');
  }

  return BigInt(btc.replace('.', ''));
};

export default btcToSat;
