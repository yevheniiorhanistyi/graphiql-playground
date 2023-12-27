import { describe, test, expect } from 'vitest';
import { getGraphQLSchema } from '@/utils/graphQL_API/getGraphQLRequest';
import { createMockSchemaString } from './mockSchema/mockSchema';

describe('getGraphQLSchema', () => {
  test('fetches and returns the GraphQL schema', async () => {
    const endpoint = 'https://rickandmortyapi.com/graphql';
    const mockSchema = createMockSchemaString();

    const schema = await getGraphQLSchema(endpoint);

    expect(schema).toEqual(mockSchema);
  });

  test('handles server errors', async () => {
    const endpoint = 'https://rickandmortyapi.com/graphql/500';

    await expect(getGraphQLSchema(endpoint)).rejects.toThrow(
      'Error status 500. Some problems with server'
    );
  });

  test('handles network errors', async () => {
    const endpoint = 'https://rickandmortyapi.com/graph';

    await expect(getGraphQLSchema(endpoint)).rejects.toThrow(
      /An error occurred while fetching the data. Please try again|Error status 500. Some problems with server/
    );
  });
});
