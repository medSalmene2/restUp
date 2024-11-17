import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      setLanguage(lang); // Update language in the state
    });
  };

  useEffect(() => {
    if (language === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ t: i18n.t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
