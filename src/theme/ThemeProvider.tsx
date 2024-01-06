import { FC, useMemo, useState, ReactNode, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';
import { getFromLocalStorage } from '@/utils/localStorageService';

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const storedTheme = getFromLocalStorage(LOCAL_STORAGE_THEME_KEY) as Theme;
    setTheme(storedTheme || Theme.LIGHT);
  }, []);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
