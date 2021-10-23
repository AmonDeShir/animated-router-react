require('jest-location-mock');

// eslint-disable-next-line no-console
console.error = (err) => {
  if (err.search(/The above error occurred in the <.*> component:/g) === -1) {
    throw new Error(err);
  }
};

// eslint-disable-next-line no-console
console.warn = (warning) => {
  throw new Error(warning);
};
