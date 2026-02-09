import formatXmr from '../../utils/formatXmr';

const cutXmr = (xmr) => {
  return `${xmr.slice(0, -8)} ${xmr.slice(-8, -4)}`;
};

function Btc({ children }) {
  return <span title={formatXmr(children)}>{cutXmr(children)}</span>;
}

export default Btc;
