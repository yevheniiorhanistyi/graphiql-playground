import { useContext } from 'react';
import { LOCAL_STORAGE_LOCALE_KEY, Locale, LocaleContext } from './LocaleContext';

interface useLocaleResult {
  toggleLocale: () => void;
  locale: Locale;
}

const useLocale = (): useLocaleResult => {
  const { locale, setLocale } = useContext(LocaleContext);

  const toggleLocale = () => {
    const newLocale = locale === Locale.EN ? Locale.EN : Locale.RU;
    setLocale(newLocale);
    localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, newLocale);
  };

  return { locale, toggleLocale };
};

export default useLocale;
