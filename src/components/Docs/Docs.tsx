import { __Schema } from '@/interfaces/schemaInterface';
import { FC } from 'react';
import DocsHeader from './DocsHeader/DocsHeader';
import DocsType from './DocsType/DocsType';

type DocsTypeType = {
  schema: __Schema;
};

const Docs: FC<DocsTypeType> = ({ schema }) => {
  console.log('Full schema: ', schema);

  const queryName = schema.queryType.name;

  const queries = schema.types.filter((type) => type.name === queryName);

  console.log('Queries: ', queries[0].fields);

  if (schema.mutationType) {
    const mutationName = schema.mutationType?.name;

    const mutations = schema.types.filter((type) => type.name === mutationName);

    console.log('Mutations: ', mutations[0].fields);
  }

  if (schema.subscriptionType) {
    const subscriptionName = schema.subscriptionType?.name;

    const subscriptions = schema.types.filter((type) => type.name === subscriptionName);

    console.log('Subscriptions: ', subscriptions[0].fields);
  }

  return (
    <>
      <DocsHeader />

      <DocsType schema={schema} />
    </>
  );
};

export default Docs;
