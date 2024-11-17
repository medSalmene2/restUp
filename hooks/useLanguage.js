import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("appLanguage");
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang) => {
    setCurrentLanguage(lang);
    await AsyncStorage.setItem("appLanguage", lang);
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[currentLanguage];
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
