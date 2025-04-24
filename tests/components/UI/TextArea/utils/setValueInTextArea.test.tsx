import { vi, describe, test, expect } from 'vitest';
import setValueInTextArea from '@/components/UI/TextArea/utils/setValueInTextArea';

describe('setValueInTextArea function', () => {
  test('inserts value at the specified row and column', () => {
    const code = 'Line 1';
    const inputValueRef = { current: 'inputValue' };
    const setCode = vi.fn();

    setValueInTextArea(code, 1, 6, inputValueRef, 'Inserted', setCode);

    expect(setCode).toHaveBeenCalledWith('Line 1\n      Inserted');
  });

  test('inserts value at the end of the code when row is beyond existing lines', () => {
    const code = 'Line 1\nLine 2\nLine 3';
    const inputValueRef = { current: 'inputValue' };
    const setCode = vi.fn();

    setValueInTextArea(code, 5, 3, inputValueRef, 'NewLine', setCode);

    expect(setCode).toHaveBeenCalledWith('Line 1\nLine 2\nLine 3\n\n\n   NewLine');
  });

  test('inserts value with correct spaces when column is beyond existing line length', () => {
    const code = 'Line 1\nLine 2\nLine 3';
    const inputValueRef = { current: 'inputValue' };
    const setCode = vi.fn();

    setValueInTextArea(code, 1, 10, inputValueRef, 'Inserted', setCode);

    expect(setCode).toHaveBeenCalledWith('Line 1\nLine 2    Inserted\nLine 3');
  });
});
