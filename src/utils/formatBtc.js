const formatBtc = (btc) => {
  return `${btc.slice(0, -4)} ${btc.slice(-4)}`;
};

export default formatBtc;
