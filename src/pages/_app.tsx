import Layout from '@/components/Layout/Layout';
import LocaleProvider from '@/localization/LocaleProvider';
import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
