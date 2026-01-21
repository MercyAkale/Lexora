// Simple, centralized error logger. Swap implementation for Sentry/DataDog later.
export const logError = (error, info) => {
  if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.error('[Lexora]', error, info);
  }
};
