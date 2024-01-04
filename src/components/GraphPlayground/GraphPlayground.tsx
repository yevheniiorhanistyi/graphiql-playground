import BasicButton from '@/components/common/BasicButton/BasicButton';
import styles from './GraphPlayground.module.scss';
import InputEndpoint from '../InputEndpoint/InputEndpoint';
import ErrorToast from '@/components/ErrorToast/ErrorToast';
import { Suspense, lazy, useEffect, useState } from 'react';
import { __Schema } from '@/interfaces/schemaInterface';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import TextArea from '../UI/TextArea/TextArea';
import useTranslation from '@/localization/useTranslation';
import { Loader } from '../Loader/Loader';
import { prepareQuery } from './utils/prepareQuery';

interface GraphQLRequestBody {
  query: string;
  variables?: Record<string, string>;
}

const GraphiQLPage = () => {
  const t = useTranslation();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const Docs = lazy(() => import('../../components/Docs/Docs'));

  const [isDocsDisplayed, setIsDocsDisplayed] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [schema, setSchema] = useState<__Schema | null>(null);
  const [disableDocsBtn, setDisableDocsBtn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEndpointCorrect, setIsEndpointCorrect] = useState<boolean>(true);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');

  const handleVariablesChange = (value: string) => {
    setVariables(value);
  };

  const handleHeadersChange = (value: string) => {
    setHeaders(value);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

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

      const requestBody: GraphQLRequestBody = { query: preparedQuery };

      if (variables) {
        try {
          const variablesObj = JSON.parse(variables);
          requestBody.variables = variablesObj;
        } catch (error) {
          console.error('Error parsing variables JSON:', error);
        }
      }

      let headersObj = {};
      if (headers) {
        try {
          headersObj = JSON.parse(headers);
        } catch (error) {
          console.error('Error parsing headers JSON:', error);
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObj,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const result = await response.json();
        setResponse(JSON.stringify(result, null, 2));
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
      <ErrorToast
        errorDescription={errorMessage}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
      <InputEndpoint getEndpoint={setEndpoint} error={isEndpointCorrect} />

      {isDocsDisplayed && schema && (
        <Suspense fallback={<Loader />}>
          <Docs schema={schema} handleClose={toggleDocsDisplayed} />
        </Suspense>
      )}
      <button onClick={handleExecuteQuery}>
        <svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.82 11L8 13.17a1.1 1.1 0 0 0 1.05.3a1.12 1.12 0 0 0 .81-.74L13.44 2A1.12 1.12 0 0 0 12 .56L1.27 4.14A1.12 1.12 0 0 0 .53 5a1.1 1.1 0 0 0 .3 1l2.74 2.74l-.09 3.47ZM13.12.78L3.57 8.74"
          />
        </svg>
      </button>
      <div className={styles.flex}>
        <TextArea
          value={query}
          onChange={handleQueryChange}
          schema={schema}
          placeholder={t['Enter code here...']}
        />

        <TextArea value={response} readOnly={true} />
      </div>
      <div className={styles.flex}>
        <TextArea
          value={variables}
          onChange={handleVariablesChange}
          placeholder={t['Enter variables here...']}
        />

        <TextArea
          value={headers}
          onChange={handleHeadersChange}
          placeholder={t['Enter headers here...']}
        />
      </div>
      <br />
      <BasicButton disabled={disableDocsBtn} onClick={toggleDocsDisplayed}>
        {t['Show Docs']}
      </BasicButton>
    </div>
  );
};

export default GraphiQLPage;
