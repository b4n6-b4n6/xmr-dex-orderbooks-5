/* global BigInt */

import getEigenWalletOffers from './getEigenWalletOffers';
import getMarketRate from './getMarketRate';

import btcToSat from '../utils/btcToSat';
import satToBtc from '../utils/satToBtc';
import picoToXmr from '../utils/picoToXmr';
import relativeness from '../utils/relativeness';
import createCached from '../utils/createCached';
import createFallbacked from '../utils/createFallbacked';

async function getNormEigenWalletOffers() {
  const offers = await getEigenWalletOffers();
  const marketRate = btcToSat(await getMarketRate());

  return (
    offers.map((offer) => {
      const offerRate = BigInt(offer.price);
      const offerBtcMin = BigInt(offer.minSwapAmount);
      const offerBtcMax = BigInt(offer.maxSwapAmount);
      const satToPico = (sat) => (sat * offerRate);
      const satToXmr = (sat) => picoToXmr(satToPico(sat));

      return {
        rate: satToBtc(offer.price),
        marketPriceRelativeness: -relativeness(marketRate, offerRate),
        btcMin: satToBtc(offerBtcMin),
        btcMax: satToBtc(offerBtcMax),
        xmrMin: satToXmr(offerBtcMin),
        xmrMax: satToXmr(offerBtcMax),
        key: offer.peerId + offer.multiAddr,
      };
    })
  );
}

export default (
  createFallbacked([])(createCached(getNormEigenWalletOffers))
);
