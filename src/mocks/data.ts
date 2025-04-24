import { __TypeKind, __DirectiveLocation, __Type } from '@/interfaces/schemaInterface';

export const mockData = {
  data: {
    __schema: {
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
    },
  },
};
