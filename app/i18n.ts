import { Resource, createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    // Configuración del detector de idioma
    detection: {
      // Orden de detección: cookie -> localStorage -> navigator -> htmlTag
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],

      // Configuración específica para cookies
      lookupCookie: process.env.NEXT_PUBLIC_LOCALES, // Nombre de la cookie
      cookieMinutes: 60 * 24 * 30, // 30 días
      cookieDomain: undefined, // Usar el dominio actual
      cookieSecure: process.env.NODE_ENV === 'production', // Secure en producción
      cookieSameSite: 'lax', // Configuración SameSite

      // Configuración para localStorage
      lookupLocalStorage: process.env.NEXT_PUBLIC_LOCALES,

      // Configuración para querystring (opcional)
      lookupQuerystring: 'lng',

      // Configuración para subdominios (opcional)
      lookupFromSubdomainIndex: 0,

      // Caché del idioma detectado
      caches: ['cookie', 'localStorage'],

      // Excluir cache del servidor
      excludeCacheFor: ['cimode'],

      // Convertir código de idioma
      convertDetectedLanguage: (lng: string) => {
        // Convertir códigos de idioma si es necesario
        // Por ejemplo: 'en-US' -> 'en'
        return lng.split('-')[0];
      },
    },

    // Interpolación
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    // Configuración de recursos
    react: {
      useSuspense: false, // Importante para SSR
    },
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
