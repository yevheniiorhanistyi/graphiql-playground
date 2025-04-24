import { useContext } from 'react';
import { Locale, LocaleContext } from './LocaleContext';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

interface Translation {
  [key: string]: string;
}

const useTranslation = (): Translation => {
  const { locale } = useContext(LocaleContext);

  const translationsEn: Translation = enTranslations;
  const translationsRu: Translation = ruTranslations;

  const t = locale === Locale.EN ? translationsEn : translationsRu;

  return t;
};

export default useTranslation;
