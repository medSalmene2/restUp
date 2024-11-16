import React from 'react';
import { flexboxLayout, button, label } from '@nativescript/core';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <flexboxLayout className="p-2 justify-end">
      <button 
        className={`mx-1 p-2 rounded-full ${currentLanguage === 'ar' ? 'bg-blue-500' : 'bg-gray-300'}`}
        onTap={() => setLanguage('ar')}
      >
        <label className="text-white">ع</label>
      </button>
      <button 
        className={`mx-1 p-2 rounded-full ${currentLanguage === 'fr' ? 'bg-blue-500' : 'bg-gray-300'}`}
        onTap={() => setLanguage('fr')}
      >
        <label className="text-white">FR</label>
      </button>
      <button 
        className={`mx-1 p-2 rounded-full ${currentLanguage === 'en' ? 'bg-blue-500' : 'bg-gray-300'}`}
        onTap={() => setLanguage('en')}
      >
        <label className="text-white">EN</label>
      </button>
    </flexboxLayout>
  );
}