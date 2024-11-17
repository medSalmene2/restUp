import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// Import your translations
import translationAR from "./locales/ar.json"; 
import translationFR from './locales/fr.json'; 
import translationEN from './locales/eng.json'; 

// Configure i18n
i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: translationAR },
    fr: { translation: translationFR },
    en: { translation: translationEN },
  },
});

// Add a listener for language change to handle RTL layout
i18n.on('languageChanged', (lng) => {
  if (lng === 'ar') {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  } else {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  }
});

export default i18n;
