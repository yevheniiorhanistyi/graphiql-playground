import { dataInterface } from '@/interfaces/schemaInterface';
import querySchema from '../../constants/querySchema';
import { prepareQuery } from '@/components/GraphPlayground/utils/prepareQuery';

export const getGraphQLSchema = async (endpoint: string, headers: string) => {
  let headersObj = {};
  if (headers) {
    try {
      const headersWithDoubleQuotes = prepareQuery(headers);
      headersObj = JSON.parse(headersWithDoubleQuotes);
    } catch (error) {
      console.error('Error parsing headers JSON:', error);
    }
  }
  try {
    const query = querySchema;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headersObj,
      },
      body: JSON.stringify({ query }),
    });

    const data: dataInterface = await response.json();
    const schema = data.data.__schema;

    if (response.status >= 500 && response.status <= 599) {
      throw new Error('Error status 500. Some problems with server');
    }

    return schema;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred while fetching the data. Please try again');
  }
};
