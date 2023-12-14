/* eslint-disable no-unused-vars */
export interface dataInterface {
  data: DataSchemaInterface;
}

interface DataSchemaInterface {
  __schema: SchemaInterface;
}

interface SchemaInterface {
  queryType: TypeInterface;
  mutationType: TypeInterface | null;
  subscriptionType: TypeInterface | null;
  types: [__Type];
  directives: [__Directive];
}

interface TypeInterface {
  name: 'string';
}

interface __Type {
  description: string | null;
  enumValues: [EnumValue] | null;
  fields: [FieldType] | null;
  inputFields: [InputFieldType] | null;
  interfaces: [] | null;
  kind: KindEnum;
  name: string | null;
  possibleTypes: null;
  ofType: __Type | null;
  specifiedByURL: string | null;
}

export enum KindEnum {
  SCALAR,
  INPUT_OBJECT,
  OBJECT,
  ENUM,
  UNION,
  INTERFACE,
  LIST,
  NON_NULL,
}

interface InputFieldType {
  defaultValue: string | null;
  description: string | null;
  name: string;
  type: [__Type];
}

interface FieldType {
  args: [InputFieldType];
  deprecationReason: string | null;
  description: string | null;
  isDeprecated: boolean;
  name: string;
  type: __Type;
}

interface EnumValue {
  deprecationReason: null;
  description: string | null;
  isDeprecated: boolean;
  name: string;
}

interface __Directive {
  args: [InputFieldType];
  description: string | null;
  locations: [DirectiveEnum];
  name: string;
}

enum DirectiveEnum {
  FIELD,
  FRAGMENT_SPREAD,
  INLINE_FRAGMENT,
  SCALAR,
  ARGUMENT_DEFINITION,
  ENUM_VALUE,
  FIELD_DEFINITION,
  INPUT_FIELD_DEFINITION,
  OBJECT,
  INTERFACE,
  QUERY,
  SCHEMA,
  UNION,
  ENUM,
  INPUT_OBJECT,
  MUTATION,
  SUBSCRIPTION,
  VARIABLE_DEFINITION,
  FRAGMENT_DEFINITION,
}
