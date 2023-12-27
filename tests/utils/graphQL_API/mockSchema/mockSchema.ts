import {
  __Schema,
  __TypeKind,
  __DirectiveLocation,
  __Type,
  __Field,
} from '@/interfaces/schemaInterface';

export const createMockSchemaObject = (): __Schema => ({
  description: 'dd',
  types: [
    {
      kind: __TypeKind.OBJECT,
      name: 'User',
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
      ] as unknown as __Field[],
      interfaces: null,
      possibleTypes: null,
      enumValues: null,
      inputFields: null,
      ofType: null,
      specifiedByURL: null,
    } as __Type,
  ],
  queryType: {
    name: 'string',
  },
  mutationType: null,
  subscriptionType: null,
  directives: [
    {
      name: 'fewewws',
      description: null,
      locations: [__DirectiveLocation.QUERY],
      args: [
        {
          name: 'string',
          description: null,
          type: {} as __Type,
          defaultValue: null,
        },
      ],
    },
  ],
});

export const createMockSchemaString = (): __Schema => ({
  description: 'Test mock',
  types: [
    {
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
    },
  ],
  queryType: {
    name: 'string',
  },
  mutationType: null,
  subscriptionType: null,
  directives: [
    {
      name: 'fewewws',
      description: null,
      locations: [__DirectiveLocation.QUERY],
      args: [
        {
          name: 'string',
          description: null,
          type: {} as __Type,
          defaultValue: null,
        },
      ],
    },
  ],
});
