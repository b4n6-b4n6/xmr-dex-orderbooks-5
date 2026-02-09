import formatBtc from '../../utils/formatBtc';
import btcToSat from '../../utils/btcToSat';
import floatingXmrToPico from '../../utils/floatingXmrToPico';
import picoToXmr from '../../utils/picoToXmr';
import formatXmr from '../../utils/formatXmr';

function Rate({ children }) {
  const altRate = formatXmr(picoToXmr(floatingXmrToPico(
    1 / (Number(btcToSat(children)) / 1e8)
  )));

  return (
    <span title={`${altRate} BTC/XMR`}>{formatBtc(children)}</span>
  );
};

export default Rate;
