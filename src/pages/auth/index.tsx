import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { URL_Queries } from '@/constants/enums';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Auth Page</h1>
        {query.form === URL_Queries.SIGNUP && <SignUpForm />}
        {query.form === URL_Queries.SIGNIN && <p>Sign In Form</p>}
      </div>
    </>
  );
}
