import getBisqOffers from './getBisqOffers';
import getMarketRate from './getMarketRate';

import btcToSat from '../utils/btcToSat';
import picoToXmr from '../utils/picoToXmr';
import relativeness from '../utils/relativeness';
import divideBigInts from '../utils/divideBigInts';
import createCached from '../utils/createCached';
import createFallbacked from '../utils/createFallbacked';

async function getNormBisqOffers() {
  const offers = await getBisqOffers();
  const marketRate = btcToSat(await getMarketRate());

  const mapper = (offer) => {
    const offerRate = offer.price;
    const satToPico = (sat) => (
      divideBigInts(sat, btcToSat(offerRate), 12)
    );
    const btcToXmr = (btc) => picoToXmr(satToPico(btcToSat(btc)));

    return {
      rate: offerRate,
      marketPriceRelativeness: (
        relativeness(btcToSat(offerRate), marketRate)
      ),
      btcMin: offer.min_amount,
      btcMax: offer.volume,
      xmrMin: btcToXmr(offer.min_amount),
      xmrMax: btcToXmr(offer.volume),
      key: offer.offer_id,
    };
  };

  return {
    buys: offers.xmr_btc.sells.map(mapper),
    sells: offers.xmr_btc.buys.map(mapper),
  };
}

export default (
  createFallbacked([])(createCached(getNormBisqOffers))
);
