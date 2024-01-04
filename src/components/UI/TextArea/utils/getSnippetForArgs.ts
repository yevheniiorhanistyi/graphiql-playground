import { __Field } from '@/interfaces/schemaInterface';

const fieldBeforeParentheses = /\w+(?=\s*?\((?:[^()]*\([^()]*\))*[^()]*$)/;

const getSnippetForArgs = (firstPart: string, fieldsOfType: [__Field] | null | undefined) => {
  if (!fieldsOfType) return null;
  const fieldName = (firstPart.match(fieldBeforeParentheses) || [])[0];
  if (!fieldName) return null;
  const field = fieldsOfType.find((field) => field.name == fieldName);
  if (!field) return null;
  const args = field.args.map((arg) => arg.name);
  return args;
};

export default getSnippetForArgs;
