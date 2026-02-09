/* global BigInt */

const floatingBtcToSat = (fBtc) => (
  BigInt(fBtc.toFixed(8).replace('.', ''))
);

export default floatingBtcToSat;
