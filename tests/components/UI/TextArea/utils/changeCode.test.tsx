import { describe, test, expect } from 'vitest';
import { changeCode } from '@/components/UI/TextArea/utils/changeCode';
import { Key } from '@/components/UI/TextArea/constants/keyDown';

describe('changeCode function', () => {
  test('adds tab spaces to code', () => {
    const code = 'const x = 5;';
    const beforeChangedCode = 5;
    const afterChangedCode = 5;
    const key = Key.TAB;

    const [newCode, selectionStart] = changeCode(code, beforeChangedCode, afterChangedCode, key);

    expect(newCode).toBe('const   x = 5;');
    expect(selectionStart).toBe(7);
  });

  test('handles backspace correctly', () => {
    const code = 'const     x = 5;';
    const beforeChangedCode = 9;
    const afterChangedCode = 9;
    const key = Key.BACKSPACE;

    const [newCode, selectionStart] = changeCode(code, beforeChangedCode, afterChangedCode, key);

    expect(newCode).toBe('const   x = 5;');
    expect(selectionStart).toBe(7);
  });

  test('adds curly braces', () => {
    const code = 'const x = 5;';
    const beforeChangedCode = 5;
    const afterChangedCode = 5;
    const key = Key.OPEN_CURLY_BRACE;

    const [newCode, selectionStart] = changeCode(code, beforeChangedCode, afterChangedCode, key);

    expect(newCode).toBe('const{} x = 5;');
    expect(selectionStart).toBe(6);
  });

  test('handles Enter key', () => {
    const code = 'function test() {}';
    const beforeChangedCode = 16;
    const afterChangedCode = 16;
    const key = Key.ENTER;

    const [newCode, selectionStart] = changeCode(code, beforeChangedCode, afterChangedCode, key);

    expect(newCode).toBe('function test() \n\n{}');
    expect(selectionStart).toBe(17);
  });
  test('handles Enter key with existing curly braces', () => {
    const code = 'function test() {    }';
    const beforeChangedCode = 19;
    const afterChangedCode = 19;
    const key = Key.ENTER;

    const [newCode, selectionStart] = changeCode(code, beforeChangedCode, afterChangedCode, key);

    expect(newCode).toBe('function test() {  \n  \n  }');
    expect(selectionStart).toBe(22);
  });
});
