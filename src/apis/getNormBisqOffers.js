import getBisqOffers from './getBisqOffers';
import getMarketRate from './getMarketRate';

import btcToSat from '../utils/btcToSat';
import floatingBtcToBtc from '../utils/floatingBtcToBtc';
import btcToFloatingBtc from '../utils/btcToFloatingBtc';
import picoToXmr from '../utils/picoToXmr';
import relativeness from '../utils/relativeness';
import divideBigInts from '../utils/divideBigInts';
import createCached from '../utils/createCached';
import createFallbacked from '../utils/createFallbacked';
import { BISQ_PLATFORM_FEE_SCALE as PLATFORM_FEE_SCALE } from '../const';

async function getNormBisqOffers() {
  const offers = await getBisqOffers();
  const marketRate = btcToSat(await getMarketRate());

  const mapper = (direction) => (offer) => {
    const isBuy = direction === 'BUY';
    const offerRate = offer.price;
    const offerRateWithPlatformFee = floatingBtcToBtc(
      btcToFloatingBtc(offer.price) *
      PLATFORM_FEE_SCALE ** (isBuy ? 1 : -1)
    );
    const satToPico = (sat) => (
      divideBigInts(sat, btcToSat(offerRate), 12)
    );
    const btcToXmr = (btc) => picoToXmr(satToPico(btcToSat(btc)));

    return {
      rate: offerRateWithPlatformFee,
      marketPriceRelativeness: (
        relativeness(btcToSat(offerRateWithPlatformFee), marketRate)
      ),
      btcMin: offer.min_amount,
      btcMax: offer.volume,
      xmrMin: btcToXmr(offer.min_amount),
      xmrMax: btcToXmr(offer.volume),
      key: offer.offer_id,
    };
  };

  return {
    buys: offers.xmr_btc.sells.map(mapper('BUY')),
    sells: offers.xmr_btc.buys.map(mapper('SELL')),
  };
}

export default (
  createFallbacked([])(createCached(getNormBisqOffers))
);
