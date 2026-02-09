import './OffersDashboard.css';

import Offers from '../Offers/Offers';
import useOffers from '../../hooks/useOffers';

function OffersDashboard() {
  const sellOffers = useOffers('SELL') || [];
  const buyOffers = useOffers('BUY') || [];

  return (
    <main className='OffersDashboard'>
      <Offers
        title={'Sell XMR for BTC'}
        offers={sellOffers}
        direction='SELL'
      />
      <Offers
        title={'Buy XMR with BTC'}
        offers={buyOffers}
        direction='BUY'
      />
    </main>
  );
};

export default OffersDashboard;
