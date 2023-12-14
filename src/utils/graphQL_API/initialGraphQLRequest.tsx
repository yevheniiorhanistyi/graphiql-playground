import { dataInterface } from '@/interfaces/schemaInterface';
import querySchema from '../../constants/querySchema';

export const initialGraphQLRequest = async (endpoint: string) => {
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

  console.log('Full schema: ', data.data.__schema);

  const queryName = data.data.__schema.queryType.name;

  const queries = data.data.__schema.types.filter((type) => type.name === queryName);

  console.log('Queries: ', queries[0].fields);

  if (data.data.__schema.mutationType) {
    const mutationName = data.data.__schema.mutationType?.name;

    const mutations = data.data.__schema.types.filter((type) => type.name === mutationName);

    console.log('Mutations: ', mutations[0].fields);
  } else {
    console.log('No mutations for this API');
  }

  if (data.data.__schema.subscriptionType) {
    const subscriptionName = data.data.__schema.subscriptionType?.name;

    const subscriptions = data.data.__schema.types.filter((type) => type.name === subscriptionName);

    console.log('Subscriptions: ', subscriptions[0].fields);
  } else {
    console.log('No subscriptions for this API');
  }
};
