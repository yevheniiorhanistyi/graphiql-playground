import { createContext } from 'react';

export enum Locale {
  // eslint-disable-next-line no-unused-vars
  EN = 'en',
  // eslint-disable-next-line no-unused-vars
  RU = 'ru',
}

export interface LocaleContextProps {
  locale: string;
  // eslint-disable-next-line no-unused-vars
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextProps>({} as LocaleContextProps);

export const LOCAL_STORAGE_LOCALE_KEY = 'en';
