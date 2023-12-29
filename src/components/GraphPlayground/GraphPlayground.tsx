import BasicButton from '@/components/common/BasicButton/BasicButton';
import styles from './GraphPlayground.module.scss';
import InputEndpoint from '../InputEndpoint/InputEndpoint';

import { Suspense, lazy, useEffect, useState } from 'react';
import { __Schema } from '@/interfaces/schemaInterface';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import TextArea from '../UI/TextArea/TextArea';
import useTranslation from '@/localization/useTranslation';
import { Loader } from '../Loader/Loader';
import { prepareQuery } from './utils/prepareQuery';

const GraphiQLPage = () => {
  const t = useTranslation();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const Docs = lazy(() => import('../../components/Docs/Docs'));

  const [isDocsDisplayed, setIsDocsDisplayed] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [schema, setSchema] = useState<__Schema | null>(null);

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (endpoint) {
      getSchema(endpoint);
    }
  }, [endpoint]);

  const getSchema = async (endpoint: string) => {
    const response = await getGraphQLSchema(endpoint);
    setSchema(response);
  };

  const toggleDocsDisplayed = () => {
    setIsDocsDisplayed((prev) => !prev);
  };

  const handleExecuteQuery = async () => {
    try {
      if (!endpoint) {
        console.error('Endpoint is not set');
        return;
      }

      const preparedQuery = prepareQuery(query);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: preparedQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  return (
    <div>
      <InputEndpoint getEndpoint={setEndpoint} />

      {isDocsDisplayed && schema && (
        <Suspense fallback={<Loader />}>
          <Docs schema={schema} handleClose={toggleDocsDisplayed} />
        </Suspense>
      )}

      <div className={styles.flex}>
        <TextArea value={query} onChange={handleQueryChange} />

        <TextArea value={response} readOnly={true} />
      </div>
      <br />
      <BasicButton onClick={handleExecuteQuery}>{t['Send']}</BasicButton>
      <br />
      <BasicButton onClick={toggleDocsDisplayed}>Show Docs</BasicButton>
    </div>
  );
};

export default GraphiQLPage;
