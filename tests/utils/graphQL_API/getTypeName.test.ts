import { describe, test, expect } from 'vitest';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { __Type, __TypeKind } from '@/interfaces/schemaInterface';

describe('getTypeName function', () => {
  test('returns name and typeName for non-null scalar type', () => {
    const type = {
      kind: __TypeKind.SCALAR,
      name: 'String',
      ofType: null,
    } as __Type;

    const result = getTypeName(type);

    expect(result).toEqual({ name: 'String', typeName: 'String' });
  });

  test('returns null for null scalar type', () => {
    const type = {
      kind: __TypeKind.SCALAR,
      name: null,
      ofType: null,
    } as __Type;

    const result = getTypeName(type);

    expect(result).toEqual({ name: null, typeName: null });
  });

  test('returns name and typeName for list of non-null scalar type', () => {
    const type: __Type = {
      kind: __TypeKind.LIST,
      name: null,
      description: 'List type',
      fields: null,
      interfaces: null,
      possibleTypes: null,
      enumValues: null,
      inputFields: null,
      specifiedByURL: null,
      ofType: {
        kind: __TypeKind.NON_NULL,
        name: null,
        description: 'Non-null type',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null,
        specifiedByURL: null,
        ofType: {
          kind: __TypeKind.SCALAR,
          name: 'Int',
          description: 'Scalar type representing an integer',
          fields: null,
          interfaces: null,
          possibleTypes: null,
          enumValues: null,
          inputFields: null,
          ofType: null,
          specifiedByURL: null,
        },
      },
    };

    const result = getTypeName(type);

    expect(result).toEqual({ name: 'Int', typeName: '[Int!]' });
  });

  test('returns name and typeName for non-null object type with fields', () => {
    const type = {
      kind: __TypeKind.OBJECT,
      name: 'User',
      ofType: null,
      fields: [
        {
          name: 'id',
          type: {
            kind: __TypeKind.SCALAR,
            name: 'ID',
            ofType: null,
          },
        },
        {
          name: 'name',
          type: {
            kind: __TypeKind.SCALAR,
            name: 'String',
            ofType: null,
          },
        },
      ],
    } as unknown as __Type;

    const result = getTypeName(type);

    expect(result).toEqual({ name: 'User', typeName: 'User' });
  });
});
