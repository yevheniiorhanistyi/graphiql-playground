import { Dispatch, SetStateAction, createContext } from 'react';

interface LocaleContextProps {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  translate(key: string): string;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: 'en',
  setLocale: () => {},
  translate: (key: string) => key,
});

export default LocaleContext;
