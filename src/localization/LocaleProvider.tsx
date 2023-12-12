import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_LOCALE_KEY, Locale, LocaleContext } from './LocaleContext';

const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN);

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY) as Locale;
    setLocale(storedLocale || Locale.EN);
  }, []);

  const defaultProps = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={defaultProps}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
