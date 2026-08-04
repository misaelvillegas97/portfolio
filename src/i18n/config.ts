import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

export type Locale = 'es' | 'en';

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
};

export async function createI18n(locale: Locale) {
  const i18n = createInstance();

  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'es',
    initImmediate: false,
    resources: {
      ...resources,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}
