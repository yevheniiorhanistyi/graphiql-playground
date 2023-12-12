import React, { useState } from "react";
import LocaleContext from "./LocaleContext";

import enLocale from "./locales/en.json";
import ruLocale from "./locales/ru.json";

const translations = {
  en: enLocale,
  ru: ruLocale,
};

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<string>("en");

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
  };

  const translate = (key: string) => {
    if (translations[locale] && translations[locale][key]) {
      return translations[locale][key];
    }
    return key;
  };

  const value = {
    locale,
    setLocale: changeLanguage,
    translate,
  };

  return (
    <LocaleContext.Provider value= { value } >
    { children }
    < /LocaleContext.Provider>
  );
};

export default LocaleProvider;
