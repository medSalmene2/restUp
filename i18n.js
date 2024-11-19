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
i18n.locale = "en"; // Set an initial locale

// Load language from AsyncStorage or use device's locale
(async () => {
  const storedLang = await AsyncStorage.getItem("appLanguage");
  const locale = storedLang || Localization.locale.split("-")[0] || "en";

  i18n.locale = locale;

  // Handle RTL for Arabic
  if (locale === "ar") {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
})();

// Enable fallbacks for missing translations
i18n.enableFallback = true;

// Function to change language
export const changeLanguage = async (lang) => {
  i18n.locale = lang;
  await AsyncStorage.setItem("appLanguage", lang);

  // Handle RTL for Arabic
  if (lang === "ar" && !I18nManager.isRTL) {
    I18nManager.forceRTL(true);
  } else if (lang !== "ar" && I18nManager.isRTL) {
    I18nManager.forceRTL(false);
  }

  // Restart the app to apply RTL changes
  setTimeout(() => {
    if (RNRestart) {
      RNRestart.Restart();
    } else {
      console.warn("RNRestart is not available");
    }
  }, 0);
};


export default i18n;