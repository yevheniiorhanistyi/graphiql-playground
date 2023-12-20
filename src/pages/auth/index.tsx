import SignInForm from '@/components/SignInForm/SignInForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { Routes, URL_Queries } from '@/constants/enums';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import useTranslation from '@/localization/useTranslation';

export default function AuthPage() {
  const t = useTranslation();
  const router = useRouter();
  const query = router.query;

  return (
    <ProtectedRoute>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.auth_container}>
        {query.form === URL_Queries.SIGNUP && (
          <>
            <div className={styles.form_container}>
              <h3 className={styles.description_text}>
                {t['Enter email and password to Sign Up']}
              </h3>
              <div className={styles.form_content}>
                <SignUpForm />
                <p className={styles.description_text}>
                  <span className={styles.link_text}>{t['You are already registered?']}</span>
                  <span className={styles.link_text}>
                    {t['Please']}&nbsp;
                    <Link
                      className={(styles.link, styles.link_text)}
                      href={{ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNIN } }}
                    >
                      {t['Sign in']}
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
        {query.form === URL_Queries.SIGNIN && (
          <>
            <div className={styles.form_container}>
              <h3 className={styles.description_text}>
                {t['Enter email and password to Sign In']}
              </h3>
              <div className={styles.form_content}>
                <SignInForm />
                <p className={styles.description_text}>
                  <span className={styles.link_text}>{t['You are already registered?']}</span>
                  <span className={styles.link_text}>
                    {t['Please']}&nbsp;
                    <Link
                      className={(styles.link, styles.link_text)}
                      href={{ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNUP } }}
                    >
                      {t['Sign up']}
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
