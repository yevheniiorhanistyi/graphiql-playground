import { describe, test, expect } from 'vitest';
import getCharWidth from '@/components/UI/TextArea/utils/getCharWidth';

describe('getCharWidth function', () => {
  test('returns a positive number', () => {
    const charWidth = getCharWidth();
    expect(charWidth).toBe(0);
  });
});
