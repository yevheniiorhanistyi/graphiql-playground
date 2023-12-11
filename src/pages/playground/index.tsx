import { Routes } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Playground() {
  const router = useRouter();

  // console.log('context from playground page');
  const { authUser } = useAuthContext();
  // console.log('PLAYGROUND PAGE. user ', u, 'is loading ', isLoading);

  useEffect(() => {
    console.log('playground use effect');
    if (!authUser) {
      // console.log('redirect from playground to welcome page');
      router.push({ pathname: Routes.WELCOME_PAGE });
    }
  }, [authUser, router]);

  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>GraphiQL Playground Page</div>
    </>
  );
}
