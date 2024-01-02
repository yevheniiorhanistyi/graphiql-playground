import { KeyboardEvent } from 'react';
import { __Schema, __Type } from '@/interfaces/schemaInterface';
import getSnippetForArgs from './getSnippetForArgs';
import { graphQLTypes } from '../constants/graphQLTypes';

const isInsideArgs = /\([^)]*$/;
const getAllFields = /\w+(?=\s*(\(.*\))?\s*{)/g;
const getPairedParenthesis = /\{[^{}]*\}/;

const getSnippet = (event: KeyboardEvent<HTMLTextAreaElement>, schema: __Schema) => {
  const target = event.target as HTMLTextAreaElement;
  const code = target.value;
  const beforeChangedCode = target.selectionStart;
  const firstPart = removePairedParentheses(code.slice(0, beforeChangedCode));
  const wordPart = (firstPart.match(/\w+$/) || [])[0];

  let openCurlyBracesCount =
    (firstPart.match(/{/g) || []).length - (firstPart.match(/}/g) || []).length;
  openCurlyBracesCount = openCurlyBracesCount < 0 ? 0 : openCurlyBracesCount;
  if (!openCurlyBracesCount) return [graphQLTypes.QUERY];
  const graphQLStack = (firstPart.match(getAllFields) || []).reverse();

  let currentType: string = schema.queryType.name;
  if (!currentType) return null;

  let fieldsOfType = getFields(schema, currentType);
  let matches = fieldsOfType?.map((field) => field.name);

  while (openCurlyBracesCount > 0 && graphQLStack.length) {
    openCurlyBracesCount--;
    const currentField = graphQLStack.pop();
    if (currentField === graphQLTypes.MUTATION || currentField === graphQLTypes.SUBSCRIPTION)
      return null;

    if (currentField === graphQLTypes.QUERY) continue;

    const fields = getFields(schema, currentType);
    const fieldType = fields?.find(
      (field) => field.name.toLowerCase() === currentField?.toLowerCase()
    )?.type;
    if (!fieldType) return null;
    currentType = getCurrentType(fieldType);
    if (!currentType) return null;

    fieldsOfType = getFields(schema, currentType);
    matches = fieldsOfType?.map((field) => field.name);
  }

  if (isInsideArgs.test(firstPart)) {
    return getSnippetForArgs(firstPart, fieldsOfType);
  }

  if (wordPart) {
    return matches?.filter((match) => match.startsWith(wordPart)) || null;
  }
  return matches || null;
};

const getFields = (schema: __Schema, currentType: string) => {
  return schema.types.find((type) => type.name?.toLowerCase() === currentType.toLowerCase())
    ?.fields;
};

const removePairedParentheses = (code: string) => {
  let codeWithoutPairedParenthesis = code;

  while (getPairedParenthesis.test(codeWithoutPairedParenthesis)) {
    codeWithoutPairedParenthesis = codeWithoutPairedParenthesis
      .split(getPairedParenthesis)
      .join('');
  }

  return codeWithoutPairedParenthesis;
};

const getCurrentType = (fieldType: __Type) => {
  let currentType = fieldType?.name;
  let currentFieldType = fieldType?.ofType;

  while (!currentType) {
    currentType = currentFieldType?.name || null;
    currentFieldType = currentFieldType?.ofType || null;
  }

  return currentType;
};

export default getSnippet;
