/* global BigInt */


import createCached from '../utils/createCached';
import floatingBtcToSat from '../utils/floatingBtcToSat';
import satToBtc from '../utils/satToBtc';
import createFallbacked from '../utils/createFallbacked';

const mockMarketRate = process.env.MOCK_MARKET_RATE;

const fetchApi1 = createFallbacked()(async function () {
  const res = await fetch(
    '/sources/cryptocompare-market-rate.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  const body = await res.json();

  return floatingBtcToSat(body.BTC);
});

const fetchApi2 = createFallbacked()(async function () {
  const res = await fetch(
    '/sources/coingecko-market-rate.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  const body = await res.json();

  return floatingBtcToSat(body.monero.btc);
});

async function getMarketRate() {
  if (mockMarketRate) { return '0.00517900'; }

  const rates = (
    (
      await Promise.all([
        fetchApi1(),
        fetchApi2(),
      ])
    ).filter(v => v)
  );

  return satToBtc(
    rates.reduce((a, b) => a + b) / BigInt(rates.length)
  );
};

export default createCached(getMarketRate);
