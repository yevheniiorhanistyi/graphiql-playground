import BasicButton from '@/components/common/BasicButton/BasicButton';
import React, { ChangeEvent } from 'react';
import styles from './GraphPlayground.module.scss';
import InputEndpoint from '../InputEndpoint/InputEndpoint';

import { Suspense, lazy, useEffect, useState } from 'react';
import { __Schema } from '@/interfaces/schemaInterface';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import TextArea from '../UI/TextArea/TextArea';

const GraphiQLPage = () => {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState({});
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [response, setResponse] = useState('');

  const Docs = lazy(() => import('../../components/Docs/Docs'));

  const [isDocsDispayed, setIsDocsDispayed] = useState<boolean>(false);
  const [endpoint, setEnpont] = useState<string | null>(null);
  const [schema, setSchema] = useState<__Schema | null>(null);

  useEffect(() => {
    fetchSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const fetchSchema = async () => {
    try {
      const response = await fetch(`${endpoint}?query={
        __schema {
          types {
            name
            description
            kind
            fields {
              name
              description
              type {
                name
                kind
              }
            }
          }
        }
      }`);
      const result = await response.json();

      setSchema(result.data);
      setSchemaLoaded(!!result.data);
    } catch (error) {
      console.error('Error fetching schema:', error);
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleVariablesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVariables(event.target.value);
  };

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHeaders({ ...headers, [name]: value });
  };

  const handleExecuteQuery = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  useEffect(() => {
    console.log('new endpoint: ', endpoint);
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
    <div>
      <InputEndpoint getEndpoint={setEnpont} />

      {isDocsDispayed && schema && (
        <Suspense fallback={<p>No GraphQL schema</p>}>
          <Docs schema={schema} handleClose={toggleDocsDyspalyed} />
        </Suspense>
      )}

      <div className={styles.flex}>
        <TextArea value={query} onChange={handleQueryChange} />

        <TextArea value={response} readOnly />
      </div>
      <BasicButton onClick={toggleDocsDyspalyed}>Show Docs</BasicButton>
    </div>
  );
};

export default GraphiQLPage;
