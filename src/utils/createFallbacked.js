const createFallbacked = (fallbackValue) => (func) => {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (err) {
      console.warn(err);
      return fallbackValue;
    }
  };
};

export default createFallbacked;
