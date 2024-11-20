import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

// Import translations
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

// Create a new I18n instance
const i18n = new I18n({
  en,
  fr,
  ar,
});

// Set the default language
i18n.defaultLocale = "en";
i18n.locale = "en";

// Function to initialize language
const initLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem("appLanguage");
    const deviceLocale = Localization.locale.split("-")[0];
    const locale = storedLang || deviceLocale || "en";

    // Validate the locale
    if (["en", "fr", "ar"].includes(locale)) {
      i18n.locale = locale;

      // Handle RTL for Arabic
      I18nManager.forceRTL(locale === "ar");
    }
  } catch (error) {
    console.error("Error initializing language:", error);
  }
};

// Enable fallbacks for missing translations
i18n.enableFallback = true;

// Function to change language
export const changeLanguage = async (lang) => {
  try {
    // Validate the language
    if (!["en", "fr", "ar"].includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    i18n.locale = lang;
    await AsyncStorage.setItem("appLanguage", lang);

    // Handle RTL for Arabic
    const isRTL = lang === "ar";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      
      // Restart the app with improved error handling
      if (RNRestart && typeof RNRestart.Restart === 'function') {
        setTimeout(() => {
          RNRestart.Restart();
        }, 0);
      } else {
        console.error("RNRestart is not available or not a function");
        // Fallback restart method (less ideal)
        // You might want to use platform-specific restart methods here
      }
    }
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

// Initialize language on module load
initLanguage();

export default i18n;