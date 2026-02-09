const satToBtc = (btc) => {
  const padded = btc.toString().padStart(8, '0');
  const frac = padded.slice(-8);
  const int = padded.slice(0, -8) || '0';

  return int + '.' + frac;
};

export default satToBtc;
