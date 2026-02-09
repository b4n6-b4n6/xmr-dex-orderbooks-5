import sortOffers from '../utils/sortOffers';
import getNormBasicSwapOffers from './getNormBasicSwapOffers';
import getNormBisqOffers from './getNormBisqOffers';
import getNormEigenWalletOffers from './getNormEigenWalletOffers';
import getNormRetoSwapOffers from './getNormRetoSwapOffers';

const BISQ_INFO = {
  platform: 'Bisq',
  extraInfo: 'Additional 1.15% or 0.575% trading fee only for offer taker',
  link: 'https://bisq.com',
};
const RETOSWAP_INFO = {
  platform: 'RetoSwap',
  extraInfo: 'Additional 0.5% trading fee only for offer taker',
  link: 'https://retoswap.com',
};
const EIGEN_WALLET_INFO = {
  platform: 'EigenWallet',
  link: 'https://eigenwallet.org',
};
const BASIC_SWAP_INFO = {
  platform: 'BasicSwap',
  link: 'https://basicswapdex.com',
};

const addBisqPlatform = a => (
  a.map(v => ({ ...v, ...BISQ_INFO }))
);
const addRetoSwapInfo = a => (
  a.map(v => ({ ...v, ...RETOSWAP_INFO }))
);
const addEigenWalletPlatform = a => (
  a.map(v => ({ ...v, ...EIGEN_WALLET_INFO }))
);
const addBasicSwapInfo = a => (
  a.map(v => ({ ...v, ...BASIC_SWAP_INFO }))
);

const hitCache = async () => {
  await Promise.all([
    getNormBisqOffers(),
    getNormEigenWalletOffers(),
    getNormBasicSwapOffers(),
    getNormRetoSwapOffers(),
  ]);
};

async function getOffers(direction) {
  const isBuy = direction === 'BUY';

  await hitCache();
  return sortOffers(
    (
      isBuy
        ? [
          ...addBisqPlatform((await getNormBisqOffers()).buys),
          ...addEigenWalletPlatform(await getNormEigenWalletOffers()),
          ...addBasicSwapInfo((await getNormBasicSwapOffers()).buys),
          ...addRetoSwapInfo((await getNormRetoSwapOffers()).buys),
        ]
        : [
          ...addBisqPlatform((await getNormBisqOffers()).sells),
          ...addBasicSwapInfo((await getNormBasicSwapOffers()).sells),
          ...addRetoSwapInfo((await getNormRetoSwapOffers()).sells),
        ]
    ),
    !isBuy
  );
};

export default getOffers;
