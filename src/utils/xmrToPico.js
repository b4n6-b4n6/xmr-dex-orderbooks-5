/* global BigInt */

const xmrToPico = (btc) => {
  if (!/^\d+\.\d{12}$/.test(btc)) {
    console.error(`'${btc}'`);
    throw new Error('bad format in xmrToPico');
  }

  return BigInt(btc.replace('.', ''));
};

export default xmrToPico;
