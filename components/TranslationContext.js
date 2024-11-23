// contexts/TranslationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { changeLanguage } from '../i18n';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    loadStoredLanguage();
  }, []);

  const loadStoredLanguage = async () => {
    try {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        setCurrentLanguage(storedLang);
        i18n.locale = storedLang;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeAppLanguage = async (lang) => {
    try {
      await changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage,
      changeLanguage: changeAppLanguage,
      t: (key) => i18n.t(key)
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);