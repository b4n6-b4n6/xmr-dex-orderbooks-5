import './Offers.css';

import ExtraDetails from '../ExtraDetails/ExtraDetails';
import Offer from './Offer';

const RANGE_TITLE = (
  'Accepted amount range'
);
function Offers({ title, offers, direction }) {
  const extraDetailsMin = (
    <ExtraDetails className='right' title={RANGE_TITLE} />
  );
  const extraDetailsMax = (
    <ExtraDetails className='left' title={RANGE_TITLE} />
  );

  return (
    <article className='Offers'>
      <h2>{title}</h2>

      <table>
        <thead>
          <tr>
            <th>Price (BTC/XMR)</th>
            <th colSpan='3'>BTC (min - max) {extraDetailsMin}</th>
            <th colSpan='3'>XMR (min - max) {extraDetailsMax}</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <Offer
              key={offer.key}
              rate={offer.rate}
              extraInfo={offer.extraInfo}
              marketPriceRelativeness={offer.marketPriceRelativeness}
              btcMin={offer.btcMin}
              btcMax={offer.btcMax}
              xmrMin={offer.xmrMin}
              xmrMax={offer.xmrMax}
              link={offer.link}
              platform={offer.platform}
              direction={direction}
            />
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Offers;
