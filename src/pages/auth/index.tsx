import SignInForm from '@/components/SignInForm/SignInForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { Routes, URL_Queries } from '@/constants/enums';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function AuthPage() {
  const router = useRouter();

  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push({ pathname: Routes.WELCOME_PAGE });
    }
    if (!router.query.form) {
      router.push({ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNIN } });
    }
  }, [router, user]);

  const query = router.query;

  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.auth_container}>
        {query.form === URL_Queries.SIGNUP && (
          <>
            <div className={styles.form_content}>
              <h3>Enter enter email and password to Sign In</h3>
              <SignUpForm />
            </div>
            <p>
              Are you already rigistered? Please{' '}
              <Link
                className={styles.link}
                href={{ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNIN } }}
              >
                Sign in
              </Link>
            </p>
          </>
        )}
        {query.form === URL_Queries.SIGNIN && (
          <>
            <div className={styles.form_content}>
              <h3>Enter enter email and password to Sign Up</h3>
              <SignInForm />
            </div>
            <p>
              Are you not rigistered? Please{' '}
              <Link
                className={styles.link}
                href={{ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNUP } }}
              >
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}
