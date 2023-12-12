import { useContext } from 'react';
import { LocaleContext } from './LocaleContext';

export const useLocale = () => {
  return useContext(LocaleContext);
};
