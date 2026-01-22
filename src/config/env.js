const envRaw = import.meta.env;

const appEnv = envRaw?.VITE_APP_ENV || envRaw?.MODE || 'development';
const baseUrl = envRaw?.VITE_PUBLIC_BASE_URL || '';
const apiBaseUrl = envRaw?.VITE_API_BASE_URL || '';
const analyticsId = envRaw?.VITE_ANALYTICS_ID || '';
const sentryDsn = envRaw?.VITE_SENTRY_DSN || '';

const validateEnv = () => {
  if (appEnv === 'production' && !baseUrl) {
    throw new Error('Missing VITE_PUBLIC_BASE_URL in production. Set it in your environment.');
  }

  if (appEnv === 'production' && !apiBaseUrl) {
    console.warn('[Lexora] VITE_API_BASE_URL is not set; API calls may fail.');
  }
};

validateEnv();

const env = {
  appEnv,
  baseUrl,
  apiBaseUrl,
  analyticsId,
  sentryDsn,
};

export default env;
