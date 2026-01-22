// Simple, centralized error logger. Swap implementation for Sentry/DataDog later.
export const logError = (error, info) => {
  if (typeof console !== 'undefined') {
    console.error('[Lexora]', error, info);
  }
};
