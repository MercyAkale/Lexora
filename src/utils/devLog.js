// Lightweight dev-only logger to keep production output clean.
export const devLog = (...args) => {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
