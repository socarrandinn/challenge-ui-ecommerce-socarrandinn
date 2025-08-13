export const ENV_CONFIG = {

  env: {
    NEXT_PUBLIC_LOCALES: 'next-i18n-locale',
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  cookies: {
    NEXT_LOCALE: 'NEXT_LOCALE',
    DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION || 'hab',

    X_REGION: 'x-region',
    X_STATE_CODE: 'x-state-code',
    X_STATE_NAME: 'x-state-name',
  }
}