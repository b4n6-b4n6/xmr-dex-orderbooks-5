const formatXmr = (xmr) => {
  return `${xmr.slice(0, -8)} ${xmr.slice(-8, -4)} ${xmr.slice(-4)}`;
};

export default formatXmr;
