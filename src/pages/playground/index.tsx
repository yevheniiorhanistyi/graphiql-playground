import InputEndpoint from '@/components/InputEndpoint/InputEndpoint';
import MainLoader from '@/components/MainLoader/MainLoader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Head from 'next/head';
import { Suspense, lazy, useState } from 'react';

export default function Playground() {
  const [isDocsDispayed, setIsDocsDispayed] = useState(false);

  const toggleDocsDyspalyed = () => {
    setIsDocsDispayed((prev) => !prev);
  };
  const Docs = lazy(() => import('../../components/Docs/Docs'));
  return (
    <ProtectedRoute>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>GraphiQL Playground Page</div>
      <InputEndpoint />
      <button onClick={toggleDocsDyspalyed}>Show Docs</button>
      {isDocsDispayed && (
        <Suspense fallback={<MainLoader />}>
          <Docs />
        </Suspense>
      )}
    </ProtectedRoute>
  );
}
