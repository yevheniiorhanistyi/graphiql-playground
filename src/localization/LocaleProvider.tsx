import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_LOCALE_KEY, Locale, LocaleContext } from './LocaleContext';
import { getFromLocalStorage } from '@/utils/localStorageService';

const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN);

  useEffect(() => {
    const storedLocale = getFromLocalStorage(LOCAL_STORAGE_LOCALE_KEY) as Locale;
    setLocale(storedLocale || Locale.EN);
  }, []);

  const defaultProps = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={defaultProps}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
