import './Footer.css';

import ExtraDetails from '../ExtraDetails/ExtraDetails';
import Btc from '../Offers/Btc';

import useMarketRate from '../../hooks/useMarketRate';

const MARKET_RATE_TITLE = (
  'Acquired from cryptocompare.com & coingecko.com'
);

function MarketRate({children}) {
  return (
    <span className='marketRate'>Market rate: <Btc>{children}</Btc> XMR/BTC <ExtraDetails className='left' title={MARKET_RATE_TITLE}/></span>
  );
}

const HAVING_ISSUES_URL = (
  'https://github.com/b4n6-b4n6/xmr-dex-orderbooks-5/issues'
);
function HavingIssues() {
  const anchor = (
    <a href={HAVING_ISSUES_URL} target="_blank" rel="noreferrer">Having issues?</a>
  );

  return (
    <span className='help'>{anchor}</span>
  );
}

function Footer() {
  const marketRate = useMarketRate();

  return (
    <footer className='Footer'>
      <HavingIssues />
      {marketRate && <MarketRate>{marketRate}</MarketRate>}
    </footer>
  );
}

export default Footer;
