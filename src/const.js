
export const BISQ_INFO = {
  platform: 'Bisq',
  extraInfo: 'Includes platform fee of 1.15% or 0.575%',
  link: 'https://bisq.com',
};
export const RETOSWAP_INFO = {
  platform: 'RetoSwap',
  extraInfo: 'Includes platform fee of 0.8%',
  link: 'https://retoswap.com',
};
export const EIGEN_WALLET_INFO = {
  platform: 'EigenWallet',
  link: 'https://eigenwallet.org',
};
export const BASIC_SWAP_INFO = {
  platform: 'BasicSwap',
  link: 'https://basicswapdex.com',
};

const doNotIncludePlatformFeesFlag = (
  new URLSearchParams(window.location.search).has('do_not_include_platform_fees')
);

const BISQ_PLATFORM_FEE_PERCENT = doNotIncludePlatformFeesFlag ? 0 : 1.15;
export const BISQ_PLATFORM_FEE_SCALE = 1 + (BISQ_PLATFORM_FEE_PERCENT / 100);

const RETOSWAP_PLATFORM_FEE_PERCENT = doNotIncludePlatformFeesFlag ? 0 : 0.8;
export const RETOSWAP_PLATFORM_FEE_SCALE = 1 + (RETOSWAP_PLATFORM_FEE_PERCENT / 100);

