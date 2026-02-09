const sortOffers = (offers, reverse) => (
  offers.sort(
    (a, b) => (
      !reverse ? (
        (a.marketPriceRelativeness - b.marketPriceRelativeness) ||
        (Number(a.btcMin) - Number(b.btcMin)) ||
        (Number(a.btcMax) - Number(b.btcMax))
      ) : (
        (b.marketPriceRelativeness - a.marketPriceRelativeness) ||
        (Number(a.btcMin) - Number(b.btcMin)) ||
        (Number(a.btcMax) - Number(b.btcMax))
      )
    )
  )
);

export default sortOffers;
