const picoToXmr = (btc) => {
  const padded = btc.toString().padStart(12, '0');
  const frac = padded.slice(-12);
  const int = padded.slice(0, -12) || '0';

  return int + '.' + frac;
};

export default picoToXmr;
