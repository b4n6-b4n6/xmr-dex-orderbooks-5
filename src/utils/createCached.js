const createCached = (func) => {
  let lastResult;

  return async () => {
    if (!lastResult) {
      lastResult = func();
    }

    return await lastResult;
  };
};

export default createCached;
