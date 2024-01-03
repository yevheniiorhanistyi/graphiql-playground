import { __Schema, __Type } from '@/interfaces/schemaInterface';

const findGraphQLType = (schema: __Schema, typeName: string | null): __Type | null => {
  if (typeName) {
    const type = schema.types.find((type) => {
      return type.name === typeName;
    });
    return type ? type : null;
  }
  return null;
};

export default findGraphQLType;
