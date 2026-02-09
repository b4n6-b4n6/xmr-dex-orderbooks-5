

async function getEigenWalletOffers () {
  const res = await fetch(
    '/sources/eigenwallet-offers.json'
  );

  if (!res.ok) { throw new Error('res is not ok'); }
  return res.json();
};

export default getEigenWalletOffers;
