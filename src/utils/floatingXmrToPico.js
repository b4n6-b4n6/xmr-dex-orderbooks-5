/* global BigInt */

const floatingXmrToPico = (floatingXmr) => (
    BigInt(floatingXmr.toFixed(12).replace('.', ''))
);

export default floatingXmrToPico;
