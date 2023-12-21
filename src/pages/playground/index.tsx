import InputEndpoint from '@/components/InputEndpoint/InputEndpoint';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { __Schema } from '@/interfaces/schemaInterface';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import Head from 'next/head';
import { Suspense, lazy, useEffect, useState } from 'react';

export default function Playground() {
  const Docs = lazy(() => import('../../components/Docs/Docs'));

  const [isDocsDispayed, setIsDocsDispayed] = useState<boolean>(false);
  const [endpoint, setEnpont] = useState<string | null>(null);
  const [schema, setSchema] = useState<__Schema | null>(null);

  useEffect(() => {
    if (endpoint) {
      getSchema(endpoint);
    }
  }, [endpoint]);

  const getSchema = async (endpoint: string) => {
    const response = await getGraphQLSchema(endpoint);
    setSchema(response);
  };

  const toggleDocsDyspalyed = () => {
    setIsDocsDispayed((prev) => !prev);
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>GraphiQL Playground Page</div>

      <InputEndpoint getEndpoint={setEnpont} />

      <button onClick={toggleDocsDyspalyed}>Show Docs</button>

      {isDocsDispayed && schema && (
        <Suspense fallback={<p>No GraphQL schema</p>}>
          <Docs schema={schema} handleClose={toggleDocsDyspalyed} />
        </Suspense>
      )}
    </ProtectedRoute>
  );
}
