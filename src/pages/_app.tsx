import Layout from '@/components/Layout/Layout';
import LocaleProvider from '@/localization/LocaleProvider';
import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Routes } from '@/constants/enums';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (
    router.pathname === Routes.WELCOME_PAGE ||
    router.pathname === `/${Routes.PLAYGROUND_PAGE}` ||
    router.pathname === `/${Routes.AUTH_PAGE}`
  ) {
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
  } else {
    return (
      <ThemeProvider>
        <LocaleProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}
