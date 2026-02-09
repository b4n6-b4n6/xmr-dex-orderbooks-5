

async function getBisqOffers () {
  const res = await fetch(
    '/sources/bisq-offers.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  return res.json();
};

export default getBisqOffers;
