import { __Schema } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsType = {
  schema: __Schema;
};

const Docs: FC<DocsType> = ({ schema }) => {
  console.log('Full schema: ', schema);

  const queryName = schema.queryType.name;

  const queries = schema.types.filter((type) => type.name === queryName);

  console.log('Queries: ', queries[0].fields);

  if (schema.mutationType) {
    const mutationName = schema.mutationType?.name;

    const mutations = schema.types.filter((type) => type.name === mutationName);

    console.log('Mutations: ', mutations[0].fields);
  } else {
    console.log('No mutations for this API');
  }

  if (schema.subscriptionType) {
    const subscriptionName = schema.subscriptionType?.name;

    const subscriptions = schema.types.filter((type) => type.name === subscriptionName);

    console.log('Subscriptions: ', subscriptions[0].fields);
  } else {
    console.log('No subscriptions for this API');
  }

  return (
    <>
      <h3>GraphQL Docs</h3>

      <div>
        <h6>Type Query</h6>
        {queries[0].fields?.map((query) => <p key={query.name}>{query.name}</p>)}
      </div>

      {schema.mutationType && (
        <div>
          <h6>Type Mutaion</h6>
          {schema.types
            .filter((type) => type.name === schema.mutationType?.name)[0]
            .fields?.map((mutation) => <p key={mutation.name}>{mutation.name}</p>)}
        </div>
      )}

      {schema.subscriptionType && (
        <div>
          <h6>Type Subscription</h6>
          {schema.types
            .filter((type) => type.name === schema.subscriptionType?.name)[0]
            .fields?.map((subscription) => <p key={subscription.name}>{subscription.name}</p>)}
        </div>
      )}
    </>
  );
};

export default Docs;
