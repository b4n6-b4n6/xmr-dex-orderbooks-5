import { useEffect, useState } from 'react';
import getOffers from '../apis/getOffers';

function useOffers(direction) {
  const [offers, setOffers] = useState();
  useEffect(() => {
    const run = async () => {
      setOffers(await getOffers(direction));
    };

    run();
  }, [direction]);

  return offers;
};

export default useOffers;
