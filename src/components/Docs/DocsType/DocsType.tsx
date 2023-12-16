import { SchemaTypes } from '@/constants/enums';
import { TypeInterface, __Schema } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsTypeType = {
  schema: __Schema;
};

const DocsType: FC<DocsTypeType> = ({ schema }) => {
  const handleTypeClick = (value: string) => {
    console.log(value);
  };

  const typeList = Object.keys(schema).map((schemaKey) => {
    if (
      schema[schemaKey as keyof __Schema] !== null &&
      (schemaKey === SchemaTypes.QUERY_TYPE ||
        schemaKey === SchemaTypes.MUTATION_TYPE ||
        schemaKey === SchemaTypes.SUBSCRIPTION_TYPE)
    ) {
      return (
        <li key={schemaKey} onClick={() => handleTypeClick(schemaKey)}>
          <span>Type: </span>
          <span>{(schema[schemaKey as keyof __Schema] as TypeInterface).name}</span>
        </li>
      );
    }
  });

  return (
    <div>
      <h5>Root Types</h5>
      <ul>{typeList}</ul>
    </div>
  );
  // <div>
  //   <h6>Type Query</h6>
  //   {schema.types
  //     .filter((type) => type.name === schema.queryType?.name)[0]
  //     .fields?.map((mutation) => <p key={mutation.name}>{mutation.name}</p>)}
  // </div>
};

export default DocsType;
