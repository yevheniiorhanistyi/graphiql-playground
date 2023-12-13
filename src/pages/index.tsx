import { Routes } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import Link from 'next/link';

export default function MainPage() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>GraphQL App</h1>
        {authUser ? (
          <Link href={Routes.PLAYGROUND_PAGE}>Go to Playground page</Link>
        ) : (
          <Link href={Routes.AUTH_PAGE}>Go to Auth page</Link>
        )}
      </div>
    </>
  );
}
