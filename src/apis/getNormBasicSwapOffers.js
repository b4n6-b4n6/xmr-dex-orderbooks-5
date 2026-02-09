/* global BigInt */

import getBasicSwapOffers from './getBasicSwapOffers';
import getMarketRate from './getMarketRate';

import xmrToPico from '../utils/xmrToPico';
import picoToXmr from '../utils/picoToXmr';
import btcToSat from '../utils/btcToSat';
import satToBtc from '../utils/satToBtc';
import relativeness from '../utils/relativeness';
import createCached from '../utils/createCached';
import divideBigInts from '../utils/divideBigInts';
import floatingBtcToSat from '../utils/floatingBtcToSat';
import createFallbacked from '../utils/createFallbacked';

async function getNormBasicSwapOffers() {
  const offers = await getBasicSwapOffers();
  const marketRate = btcToSat(await getMarketRate());

  return {
    buys: (
      offers
        .filter(({ maker, taker }) => maker === 'Monero' && taker === 'Bitcoin')
        .map((offer) => {
          const offerRate = floatingBtcToSat(offer.rate);
          const picoToSat = (pico) => (
            // pico * offerRate - this is wrong because offerRate is is XMR/SAT
            // (pico / 1e12) * offerRate - this is wrong because precision will be lost
            // (pico) * (offerRate / 1e12) - this is wrong because precision will be lost
            pico * offerRate / BigInt(1e12) // profit???
          );
          const xmrToBtc = (xmr) => satToBtc(picoToSat(xmrToPico(xmr)));

          return {
            rate: satToBtc(offerRate),
            marketPriceRelativeness: -relativeness(marketRate, offerRate),
            btcMin: xmrToBtc(offer.amount_min),
            btcMax: xmrToBtc(offer.amount_max),
            xmrMin: offer.amount_min,
            xmrMax: offer.amount_max,
            key: JSON.stringify(offer),
          };
        })
    ),
    sells: (
      offers
        .filter(({ maker, taker }) => maker === 'Bitcoin' && taker === 'Monero')
        .map((offer) => {
          const offerRate = floatingBtcToSat(1 / offer.rate);
          const satToPico = (sat) => (
            divideBigInts(sat, offerRate, 12)
          );
          const btcToXmr = (btc) => picoToXmr(satToPico(btcToSat(btc)));

          return {
            rate: satToBtc(offerRate),
            marketPriceRelativeness: -relativeness(marketRate, offerRate),
            btcMin: offer.amount_min,
            btcMax: offer.amount_max,
            xmrMin: btcToXmr(offer.amount_min),
            xmrMax: btcToXmr(offer.amount_max),
            key: JSON.stringify(offer),
          };
        })
    ),
  };
}

export default (
  createFallbacked([])(createCached(getNormBasicSwapOffers))
);
