import Layout from '@/components/Layout/Layout';
import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
