/* eslint-disable no-unused-vars */
import { createContext } from 'react';

export enum Locale {
  EN = 'en',
  RU = 'ru',
}
export interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextProps>({} as LocaleContextProps);

export const LOCAL_STORAGE_LOCALE_KEY = 'locale';
