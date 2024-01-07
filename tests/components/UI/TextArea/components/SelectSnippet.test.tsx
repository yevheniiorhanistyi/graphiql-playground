import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SelectSnippet from '@/components/UI/TextArea/components/SelectSnippet';

describe('SelectSnippet component', () => {
  test('renders SelectSnippet component without errors', () => {
    const { container } = render(
      <SelectSnippet
        matches={['Option 1', 'Option 2']}
        setMatches={vi.fn()}
        cursorPosition={{ top: 0, left: 0 }}
        code="test code"
        setCode={vi.fn()}
        cursorCount={{ row: 1, col: 1 }}
        inputValueRef={{ current: '' }}
        codeEditorRef={{ current: document.createElement('textarea') }}
      />
    );
    expect(container).not.toBeNull();
  });

  test('selects an option and updates code', () => {
    const setMatches = vi.fn();
    const setCode = vi.fn();
    const inputValueRef = { current: 'input' };
    const codeEditorRef = { current: document.createElement('textarea') };

    const { getByText } = render(
      <SelectSnippet
        matches={['Option 1', 'Option 2']}
        setMatches={setMatches}
        cursorPosition={{ top: 0, left: 0 }}
        code="test code"
        setCode={setCode}
        cursorCount={{ row: 1, col: 1 }}
        inputValueRef={inputValueRef}
        codeEditorRef={codeEditorRef}
      />
    );

    const option = getByText('Option 1');
    fireEvent.click(option);

    expect(setMatches).toHaveBeenCalledWith([]);
  });
});
