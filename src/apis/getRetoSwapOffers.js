

async function getRetoSwapOffers () {
  const res = await fetch(
    '/sources/retoswap-offers.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  return res.json();
};

export default getRetoSwapOffers;
