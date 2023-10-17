import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    preload: ['en'],
    load: 'languageOnly',
    fallbackLng: 'en',
    debug: true,
    lowerCaseLng: true,
    detection: {
      order: ['localStorage']
    }
  });

export default i18n;