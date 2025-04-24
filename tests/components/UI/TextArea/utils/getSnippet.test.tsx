import { describe, test, expect } from 'vitest';
import { KeyboardEvent } from 'react';
import getSnippet from '@/components/UI/TextArea/utils/getSnippet';
import { __Schema } from '@/interfaces/schemaInterface';

const createMockEvent = (
  code: string,
  selectionStart: number
): KeyboardEvent<HTMLTextAreaElement> => {
  const target = document.createElement('textarea');
  target.value = code;
  target.selectionStart = selectionStart;
  target.selectionEnd = selectionStart;
  return { target } as unknown as KeyboardEvent<HTMLTextAreaElement>;
};

describe('getSnippet function', () => {
  test('returns null if no GraphQL types found', () => {
    const schema = { queryType: { name: 'Query' }, types: [] } as unknown as __Schema;
    const event = createMockEvent('some text', 5);
    const result = getSnippet(event, schema);
    expect(result).toStrictEqual(['query', 'mutation', 'subscription']);
  });

  test('returns GraphQL types if open curly braces count is 0', () => {
    const schema = { queryType: { name: 'Query' }, types: [] } as unknown as __Schema;
    const event = createMockEvent('some text {', 14);
    const result = getSnippet(event, schema);
    expect(result).toBe(null);
  });

  test('returns null if current type cannot be determined', () => {
    const schema = {
      queryType: { name: 'Query' },
      types: [{ name: 'InvalidType', fields: [] }],
    } as unknown as __Schema;
    const event = createMockEvent('some text { InvalidType', 22);
    const result = getSnippet(event, schema);
    expect(result).toBe(null);
  });

  test('returns matches based on wordPart', () => {
    const schema = {
      queryType: { name: 'Query' },
      types: [{ name: 'Type', fields: [{ name: 'field1' }] }],
    } as unknown as __Schema;
    const event = createMockEvent('some text field', 13);
    const result = getSnippet(event, schema);
    expect(result).toEqual(['query', 'mutation', 'subscription']);
  });
});
