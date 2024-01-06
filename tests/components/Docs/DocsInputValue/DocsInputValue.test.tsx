import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LocaleProvider from '@/localization/LocaleProvider';
import DocsInputValue from '@/components/Docs/DocsInputValue/DocsInputValue';
import { mockInputValue } from '../../../mockSchema';

const handleClickValueMock = vi.fn();

describe('DocsInputValue component', () => {
  test('renders DocsInputValue component with mock input value', () => {
    render(
      <LocaleProvider>
        <DocsInputValue inputValue={mockInputValue} handleClickValue={handleClickValueMock} />
      </LocaleProvider>
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('String')).toBeInTheDocument();
  });

  test('calls handleClickValue when type is clicked', () => {
    render(<DocsInputValue inputValue={mockInputValue} handleClickValue={handleClickValueMock} />);

    fireEvent.click(screen.getByText('String'));

    expect(handleClickValueMock).toHaveBeenCalledWith(mockInputValue.type);
  });
});
