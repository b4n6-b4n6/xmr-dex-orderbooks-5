import getRetoSwapOffers from './getRetoSwapOffers';
import getMarketRate from './getMarketRate';

import satToBtc from '../utils/satToBtc';
import btcToSat from '../utils/btcToSat';
import floatingBtcToSat from '../utils/floatingBtcToSat';
import picoToXmr from '../utils/picoToXmr';
import floatingXmrToPico from '../utils/floatingXmrToPico';
import createCached from '../utils/createCached';
import relativeness from '../utils/relativeness';
import createFallbacked from '../utils/createFallbacked';
import { RETOSWAP_PLATFORM_FEE_SCALE as PLATFORM_FEE_SCALE } from '../const';

async function getNormRetoSwapOffers() {
  const offers = await getRetoSwapOffers();
  const marketRate = btcToSat(await getMarketRate());

  return {
    buys: (
      Object.values(offers.SELL).flat().map((offer) => {
        const offerRate = floatingBtcToSat(1 / offer.price * PLATFORM_FEE_SCALE);

        return {
          rate: satToBtc(offerRate),
          marketPriceRelativeness: -relativeness(marketRate, offerRate),
          btcMin: satToBtc(floatingBtcToSat(offer.primaryMarketMinAmount)),
          btcMax: satToBtc(floatingBtcToSat(offer.primaryMarketAmount)),
          xmrMin: picoToXmr(floatingXmrToPico(offer.minAmount)),
          xmrMax: picoToXmr(floatingXmrToPico(offer.amount)),
          key: offer.id,
        };
      })
    ),
    sells: (
      Object.values(offers.BUY).flat().map((offer) => {
        const offerRate = floatingBtcToSat(1 / offer.price / PLATFORM_FEE_SCALE);

        return {
          rate: satToBtc(offerRate),
          marketPriceRelativeness: -relativeness(marketRate, offerRate),
          btcMin: satToBtc(floatingBtcToSat(offer.primaryMarketMinAmount)),
          btcMax: satToBtc(floatingBtcToSat(offer.primaryMarketAmount)),
          xmrMin: picoToXmr(floatingXmrToPico(offer.minAmount)),
          xmrMax: picoToXmr(floatingXmrToPico(offer.amount)),
          key: offer.id,
        };
      })
    ),
  };
}

export default (
  createFallbacked([])(createCached(getNormRetoSwapOffers))
);
