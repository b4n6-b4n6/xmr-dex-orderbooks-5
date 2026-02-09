import { useEffect, useState } from 'react';
import getMarketRate from '../apis/getMarketRate';

function useMarketRate() {
  const [marketRate, setMarketRate] = useState();
  useEffect(() => {
    const run = async () => {
      setMarketRate(await getMarketRate());
    };

    run();
  }, []);

  return marketRate;
};

export default useMarketRate;
