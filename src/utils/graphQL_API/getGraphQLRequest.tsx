import { dataInterface } from '@/interfaces/schemaInterface';
import querySchema from '../../constants/querySchema';

export const getGraphQLSchema = async (endpoint: string) => {
  try {
    const query = querySchema;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
