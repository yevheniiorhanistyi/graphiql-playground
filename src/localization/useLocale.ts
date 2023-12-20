import { useContext } from 'react';
import { LOCAL_STORAGE_LOCALE_KEY, Locale, LocaleContext } from './LocaleContext';

interface useLocaleResult {
  // eslint-disable-next-line no-unused-vars
  toggleLocale: (lang: string) => void;
  locale: Locale;
}

const useLocale = (): useLocaleResult => {
  const { locale, setLocale } = useContext(LocaleContext);

  const toggleLocale = (lang: string) => {
    const newLocale = lang === 'en' ? Locale.EN : Locale.RU;
    setLocale(newLocale);
    localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, newLocale);
  };

  return { locale, toggleLocale };
};

export default useLocale;
