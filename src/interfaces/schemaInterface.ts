/* eslint-disable no-unused-vars */
export interface dataInterface {
  data: DataSchemaInterface;
}

interface DataSchemaInterface {
  __schema: __Schema;
}

export interface __Schema {
  description: string | null;
  types: [__Type];
  queryType: TypeInterface;
  mutationType: TypeInterface | null;
  subscriptionType: TypeInterface | null;
  directives: [__Directive];
}

export interface TypeInterface {
  name: 'string';
}

export interface __Type {
  kind: __TypeKind;
  name: string | null;
  description: string | null;
  fields: [__Field] | null;
  interfaces: [__Type] | null;
  possibleTypes: [__Type] | null;
  enumValues: [__EnumValue] | null;
  inputFields: [__InputValue] | null;
  ofType: __Type | null;
  specifiedByURL: string | null;
}

export enum __TypeKind {
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  INPUT_OBJECT = 'INPUT_OBJECT',
  LIST = 'LIST',
  NON_NULL = 'NON_NULL',
}

export interface __InputValue {
  name: string;
  description: string | null;
  type: __Type;
  defaultValue: string | null;
}

export interface __Field {
  name: string;
  description: string | null;
  args: [__InputValue];
  type: __Type;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

interface __EnumValue {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

interface __Directive {
  name: string;
  description: string | null;
  locations: [__DirectiveLocation];
  args: [__InputValue];
}

enum __DirectiveLocation {
  QUERY,
  MUTATION,
  SUBSCRIPTION,
  FIELD,
  FRAGMENT_DEFINITION,
  FRAGMENT_SPREAD,
  INLINE_FRAGMENT,
  VARIABLE_DEFINITION,
  SCHEMA,
  SCALAR,
  OBJECT,
  FIELD_DEFINITION,
  ARGUMENT_DEFINITION,
  INTERFACE,
  UNION,
  ENUM,
  ENUM_VALUE,
  INPUT_OBJECT,
  INPUT_FIELD_DEFINITION,
}
