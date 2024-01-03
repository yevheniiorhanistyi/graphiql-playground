import ErrorToast from '@/components/ErrorToast/ErrorToast';
import InputEndpoint from '@/components/InputEndpoint/InputEndpoint';
import { Loader } from '@/components/Loader/Loader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { __Schema } from '@/interfaces/schemaInterface';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import Head from 'next/head';
import { Suspense, lazy, useEffect, useState } from 'react';

export default function Playground() {
  const Docs = lazy(() => import('../../components/Docs/Docs'));

  const [isDocsDisplayed, setIsDocsDisplayed] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [schema, setSchema] = useState<__Schema | null>(null);
  const [disableDocsBtn, setDisableDocsBtn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEndpointCorrect, setIsEndpointCorrect] = useState<boolean>(true);

  useEffect(() => {
    if (endpoint) {
      getSchema(endpoint);
    }
  }, [endpoint]);

  useEffect(() => {
    schema && endpoint
      ? setDisableDocsBtn(false)
      : (setDisableDocsBtn(true), setIsDocsDisplayed(false));
  }, [schema, endpoint]);

  const getSchema = (endpoint: string) => {
    getGraphQLSchema(endpoint)
      .then((response) => {
        setSchema(response);
        setIsEndpointCorrect(true);
        setErrorMessage(null);
      })
      .catch((error: Error) => {
        setSchema(null);
        setIsEndpointCorrect(false);
        setErrorMessage(error.message);
      });
    // setSchema(response);
  };

  const toggleDocsDisplayed = () => {
    setIsDocsDisplayed((prev) => !prev);
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorMessage && (
        <ErrorToast errorDescription={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      <div>GraphiQL Playground Page</div>

      <InputEndpoint getEndpoint={setEndpoint} error={isEndpointCorrect} />

      <button disabled={disableDocsBtn} onClick={toggleDocsDisplayed}>
        Show Docs
      </button>

      {isDocsDisplayed && schema && (
        <Suspense fallback={<Loader />}>
          <Docs schema={schema} handleClose={toggleDocsDisplayed} />
        </Suspense>
      )}
    </ProtectedRoute>
  );
}
