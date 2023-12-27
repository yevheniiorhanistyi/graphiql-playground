import { describe, test, expect } from 'vitest';
import { __TypeKind } from '@/interfaces/schemaInterface';
import findGraphQLType from '@/utils/graphQL_API/findGraphQLType';
import { createMockSchemaObject, createMockSchemaString } from '../../mockSchema';

describe('findGraphQLType function', () => {
  test('returns null for non-existing type', () => {
    const schema = createMockSchemaString();
    const result = findGraphQLType(schema, 'NonExistingType');
    expect(result).toBeNull();
  });

  test('returns type for existing scalar type', () => {
    const schema = createMockSchemaString();
    const result = findGraphQLType(schema, 'String');
    expect(result).toEqual({
      kind: __TypeKind.SCALAR,
      name: 'String',
      description: 'Scalar type representing a string',
      fields: null,
      interfaces: null,
      possibleTypes: null,
      enumValues: null,
      inputFields: null,
      ofType: null,
      specifiedByURL: null,
    });
  });

  test('return null if typeName is null', () => {
    const schema = createMockSchemaString();
    const result = findGraphQLType(schema, null);
    expect(result).toBe(null);
  });

  test('returns type for existing object type', () => {
    const schema = createMockSchemaObject();
    const result = findGraphQLType(schema, 'string');
    expect(result).toEqual({
      kind: __TypeKind.OBJECT,
      name: 'string',
      description: 'User type',
      fields: [
        {
          name: 'id',
          description: 'User ID',
          args: [],
          type: {
            kind: __TypeKind.SCALAR,
            name: 'ID',
            description: 'Scalar type representing an ID',
            fields: null,
            interfaces: null,
            possibleTypes: null,
            enumValues: null,
            inputFields: null,
            ofType: null,
            specifiedByURL: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      interfaces: null,
      possibleTypes: null,
      enumValues: null,
      inputFields: null,
      ofType: null,
      specifiedByURL: null,
    });
  });
});
