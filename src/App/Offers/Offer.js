import ExtraDetails from '../ExtraDetails/ExtraDetails';
import Btc from './Btc';
import Xmr from './Xmr';
import Mpr from './Mpr';

function Offer(offer) {
  const platformExtraDetails = (
    offer.extraInfo &&
      <ExtraDetails className='left' title={offer.extraInfo} symbol='!' />
  );

  return (
    <tr>
      <td><Mpr
        mpr={offer.marketPriceRelativeness}
        rate={offer.rate}
        direction={offer.direction}
      ></Mpr></td>
      {
        offer.btcMin !== offer.btcMax
        ? <>
          <td className='min'><Btc>{offer.btcMin}</Btc></td>
          <td className='range'>-</td>
          <td className='max'><Btc>{offer.btcMax}</Btc></td>
        </>
        : <>
          <td className='single' colSpan='3'><Btc>{offer.btcMin}</Btc></td>
        </>
      }
      {
        offer.xmrMin !== offer.xmrMax
        ? <>
          <td className='min'><Xmr>{offer.xmrMin}</Xmr></td>
          <td className='range'>-</td>
          <td className='max'><Xmr>{offer.xmrMax}</Xmr></td>
        </>
        : <>
          <td className='single' colSpan='3'><Xmr>{offer.xmrMin}</Xmr></td>
        </>
      }
      <td><a href={offer.link}>{offer.platform}</a> {platformExtraDetails}</td>
    </tr>
  );
};

export default Offer;
