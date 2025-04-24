import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TextArea from '@/components/UI/TextArea/TextArea';

const handleChange = vi.fn();

describe('TextArea component', () => {
  test('renders TextArea component without errors', () => {
    const { container } = render(<TextArea />);
    expect(container).not.toBeNull();
  });

  test('calls onChange when the value changes', () => {
    const { getByTestId } = render(<TextArea onChange={handleChange} />);
    const textarea = getByTestId('codeEditor');
    fireEvent.change(textarea, { target: { value: 'New value' } });
    expect(handleChange).toHaveBeenCalledWith('New value');
  });

  test('clears content and calls onChange when handleClear is triggered', () => {
    const { getByTestId } = render(<TextArea onChange={handleChange} />);
    const textarea = getByTestId('codeEditor') as HTMLInputElement;

    fireEvent.change(textarea, { target: { value: 'Initial value' } });

    const clearButton = getByTestId('clear-button');
    fireEvent.click(clearButton);

    expect(textarea.value).toBe('');
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
