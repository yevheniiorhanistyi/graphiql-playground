import { describe, test, expect } from 'vitest';
import getSnippetForArgs from '@/components/UI/TextArea/utils/getSnippetForArgs';
import { createMockSchemaObject } from '../../../../mockSchema';

const mockSchema = createMockSchemaObject();

describe('getSnippetForArgs function', () => {
  test('returns null for null or undefined fieldsOfType', () => {
    const snippet = getSnippetForArgs('someField', null);
    expect(snippet).toBe(null);

    const snippetUndefined = getSnippetForArgs('someField', undefined);
    expect(snippetUndefined).toBe(null);
  });

  test('returns null for invalid fieldName', () => {
    const snippet = getSnippetForArgs('invalidField', mockSchema.types[0].fields);
    expect(snippet).toBe(null);
  });

  test('returns args snippet for valid fieldName', () => {
    const snippet = getSnippetForArgs('id(', mockSchema.types[0]?.fields);
    expect(snippet).toEqual([]);
  });
});
