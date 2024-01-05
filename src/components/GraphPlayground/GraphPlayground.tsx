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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEndpointCorrect, setIsEndpointCorrect] = useState<boolean>(true);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [selectedTab, setSelectedTab] = useState<'variables' | 'headers'>('variables');

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

  const getSchema = (endpoint: string) => {
    getGraphQLSchema(endpoint)
      .then((response) => {
        setSchema(response);
        setIsEndpointCorrect(true);
        setErrorMessage(null);
        localStorage.setItem('endpoint', endpoint);
      })
      .catch((error: Error) => {
        setSchema(null);
        setIsEndpointCorrect(false);
        setErrorMessage(error.message);
        localStorage.removeItem('endpoint');
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
          const variablesWithDoubleQuotes = prepareQuery(variables);
          const variablesObj = JSON.parse(variablesWithDoubleQuotes);
          requestBody.variables = variablesObj;
        } catch (error) {
          console.error('Error parsing variables JSON:', error);
        }
      }

      let headersObj = {};
      if (headers) {
        try {
          const headersWithDoubleQuotes = prepareQuery(headers);
          headersObj = JSON.parse(headersWithDoubleQuotes);
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
    <>
      <ErrorToast
        errorDescription={errorMessage}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />

      {isDocsDisplayed && schema && (
        <Suspense fallback={<Loader />}>
          <Docs schema={schema} handleClose={toggleDocsDisplayed} />
        </Suspense>
      )}

      <div className={styles.playground_container}>
        <div className={styles.input_part}>
          <InputEndpoint
            getEndpoint={setEndpoint}
            error={isEndpointCorrect}
            setIsEndpointCorrect={setIsEndpointCorrect}
          />
          <button
            className={styles.send_button}
            onClick={handleExecuteQuery}
            disabled={!isEndpointCorrect}
          >
            <svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.82 11L8 13.17a1.1 1.1 0 0 0 1.05.3a1.12 1.12 0 0 0 .81-.74L13.44 2A1.12 1.12 0 0 0 12 .56L1.27 4.14A1.12 1.12 0 0 0 .53 5a1.1 1.1 0 0 0 .3 1l2.74 2.74l-.09 3.47ZM13.12.78L3.57 8.74"
              />
            </svg>
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.textEditor_part}>
              <TextArea
                value={query}
                onChange={handleQueryChange}
                schema={schema}
                placeholder={t['Enter code here...']}
              />
            </div>

            <div className={styles.variables_part}>
              <button
                className={`${styles.tab_button} ${
                  selectedTab === 'variables' ? styles.active : ''
                }`}
                onClick={() => setSelectedTab('variables')}
              >
                {t['Variables']}
              </button>
              <button
                className={`${styles.tab_button} ${selectedTab === 'headers' ? styles.active : ''}`}
                onClick={() => setSelectedTab('headers')}
              >
                {t['Headers']}
              </button>
              {selectedTab === 'variables' && (
                <TextArea
                  value={variables}
                  onChange={handleVariablesChange}
                  placeholder={t['Enter variables here...']}
                />
              )}

              {selectedTab === 'headers' && (
                <TextArea
                  value={headers}
                  onChange={handleHeadersChange}
                  placeholder={t['Enter headers here...']}
                />
              )}
            </div>
          </div>

          <div className={styles.result_part}>
            <TextArea
              value={response}
              readOnly={true}
              placeholder={t['Submit a request to get the result in this field...']}
            />
          </div>
        </div>
      </div>

      <button
        className={styles.docs_button}
        disabled={!isEndpointCorrect}
        onClick={toggleDocsDisplayed}
      >
        <svg height="24px" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>docs icon</title>
          <path
            d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25"
            stroke="currentColor"
            strokeWidth="1.5"
          ></path>
          <line x1="13" y1="11.75" x2="6" y2="11.75" stroke="currentColor" strokeWidth="1.5"></line>
        </svg>
      </button>
    </>
  );
};

export default GraphiQLPage;
