import './Mpr.css';

import ExtraDetails from '../ExtraDetails/ExtraDetails';
import Rate from './Rate';
import Relativeness from './Relativeness';

const PAY_MORE_TITLE = (
  'More than the current market price'
);
const PAY_EQUAL_TITLE = (
  'Exactly the current market price'
);
const PAY_LESS_TITLE = (
  'Less than the current market price'
);
const payTitle = (mpr) => (
  (Number(mpr) > 0 && PAY_MORE_TITLE) ||
  (Number(mpr) === 0 && PAY_EQUAL_TITLE) ||
  (Number(mpr) < 0 && PAY_LESS_TITLE)
);

const className = (mpr, direction) => {
  const isBuy = direction === 'BUY';

  return (
    (isBuy && Number(mpr) > 0 && 'red') ||
    (isBuy && Number(mpr) < 0 && 'green') ||
    (!isBuy && Number(mpr) > 0 && 'green') ||
    (!isBuy && Number(mpr) < 0 && 'red') ||
    ''
  );
};

function Mpr({ rate, mpr, direction }) {
  const relativeness = (
    <span className={className(mpr, direction)}><Relativeness>{mpr}</Relativeness></span>
  );
  const extraDetails = <ExtraDetails className='right' title={payTitle(mpr)} />;

  return (
    <>
      <Rate>{rate}</Rate> ({relativeness} {extraDetails})
    </>
  );
}

// TODO add reverse rate under title

export default Mpr;
