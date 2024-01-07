import { describe, test, expect } from 'vitest';
import { prepareQuery } from '@/components/GraphPlayground/utils/prepareQuery';

describe('prepareQuery function', () => {
  test('replaces single quotes with double quotes', () => {
    const input = "This is 'sample' input";
    const result = prepareQuery(input);
    expect(result).toBe('This is "sample" input');
  });

  test('handles empty input', () => {
    const input = '';
    const result = prepareQuery(input);
    expect(result).toBe('');
  });

  test('does not change the string without single quotes', () => {
    const input = 'No single quotes here';
    const result = prepareQuery(input);
    expect(result).toBe(input);
  });

  test('replaces all occurrences of single quotes', () => {
    const input = "Don't forget to 'prepare' the query with single quotes";
    const result = prepareQuery(input);
    expect(result).toBe('Don"t forget to "prepare" the query with single quotes');
  });
});
