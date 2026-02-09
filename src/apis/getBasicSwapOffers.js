

async function getBasicSwapOffers () {
  const res = await fetch(
    '/sources/basicswap-offers.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  return res.json();
};

export default getBasicSwapOffers;
