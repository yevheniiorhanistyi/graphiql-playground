import Layout from '@/components/Layout/Layout';
import LocaleProvider from '@/localization/LocaleProvider';
import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Routes } from '@/constants/enums';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { Fallback } from '@/components/ErrorBoundary/Fallback/Fallback';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <ThemeProvider>
        <LocaleProvider>
          <AuthContextProvider>
            {router.pathname === Routes.WELCOME_PAGE ||
            router.pathname === `/${Routes.PLAYGROUND_PAGE}` ||
            router.pathname === `/${Routes.AUTH_PAGE}` ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </AuthContextProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
