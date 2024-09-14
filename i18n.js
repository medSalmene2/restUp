import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import your translations
import translationAR from './locales/ar.json';  // Arabic translations
import translationFR from './locales/fr.json';  // French translations

// Configuration for i18n
i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: translationAR },
    fr: { translation: translationFR },
  },
  lng: RNLocalize.getLocales()[0].languageCode || 'fr',  // Default language, here 'fr'
  fallbackLng: 'fr',  // Fallback language
  interpolation: {
    escapeValue: false,  // No need to escape values in React Native
  },
});

export default i18n;
