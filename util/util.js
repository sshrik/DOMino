function deepCopy(obj) {
  const clone = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      clone[key] = deepCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  });
  return clone;
}

export {deepCopy}