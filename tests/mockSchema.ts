import {
  __Schema,
  __TypeKind,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
} from '@/interfaces/schemaInterface';

export const createMockSchemaObject = (): __Schema => ({
  description: 'dd',
  types: [
    {
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

export const mockInputValue = {
  name: 'name',
  description: '',
  type: {
    kind: 'SCALAR',
    name: 'String',
    ofType: null,
  },
  defaultValue: null,
} as __InputValue;

export const mockField = {
  name: 'characters',
  description: 'Get the list of all characters',
  args: [
    {
      name: 'page',
      description: '',
      type: {
        kind: 'SCALAR',
        name: 'Int',
        ofType: null,
      },
      defaultValue: null,
    },
    {
      name: 'filter',
      description: '',
      type: {
        kind: 'INPUT_OBJECT',
        name: 'Filter Character',
        ofType: null,
      },
      defaultValue: null,
    },
  ],
  type: {
    kind: 'OBJECT',
    name: 'Characters',
    ofType: null,
  },
  isDeprecated: false,
  deprecationReason: null,
} as unknown as __Field;

export const mockFieldWithoutArgs = {
  name: 'characters',
  description: 'Get the list of all characters',
  args: [],
  type: {
    kind: 'OBJECT',
    name: 'Characters',
    ofType: null,
  },
  isDeprecated: false,
  deprecationReason: null,
} as unknown as __Field;

export const mockInputType = {
  name: 'MockInputType',
  kind: 'INPUT_OBJECT',
  description: 'Mock input type description',
  inputFields: [
    {
      name: 'field1',
      description: 'Field 1 description',
      type: { kind: 'SCALAR', name: 'String', ofType: null },
      defaultValue: null,
    },
    {
      name: 'field2',
      description: 'Field 2 description',
      type: { kind: 'SCALAR', name: 'Int', ofType: null },
      defaultValue: null,
    },
  ],
  ofType: null,
} as unknown as __Type;

export const mockInputTypeWithoutFields = {
  name: 'MockInputType',
  kind: 'INPUT_OBJECT',
  description: 'Mock input type description',
  ofType: null,
} as unknown as __Type;

export const mockInputTypeWithoutDescription = {
  name: 'MockInputType',
  kind: 'INPUT_OBJECT',
  ofType: null,
} as unknown as __Type;

export const mockNonInputType = {
  name: 'MockNonInputType',
  kind: 'OBJECT',
  ofType: null,
} as unknown as __Type;
