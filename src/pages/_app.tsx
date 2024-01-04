import Layout from '@/components/Layout/Layout';
import LocaleProvider from '@/localization/LocaleProvider';
import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Fallback } from '@/components/ErrorBoundary/Fallback/Fallback';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <ThemeProvider>
        <LocaleProvider>
          <AuthContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthContextProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
