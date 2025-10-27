import { useState, createContext, useContext } from 'react';
import ptBR from './pt-BR.json';
import en from './en.json';

const translations = { 'pt-BR': ptBR, 'en': en };

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || (navigator.language.split('-')[0] === 'pt' ? 'pt-BR' : 'en')
  );

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <I18nContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);

