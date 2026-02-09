import './ExtraDetails.css';

function ExtraDetails({ title, className, symbol = '?'}) {
  return (
    <span
      tabIndex='0'
      className={['ExtraDetails', className].filter(v => v).join(' ')}
      title={title}
    >{symbol}</span>
  );
}

export default ExtraDetails;
