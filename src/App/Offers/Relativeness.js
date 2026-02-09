function Relativeness({ children }) {
  return (
    children.toLocaleString(
      'en-US',
      {
        signDisplay: 'exceptZero', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2,
      }
    ).padStart(7, ' ') + '%'
  );
}

export default Relativeness;
