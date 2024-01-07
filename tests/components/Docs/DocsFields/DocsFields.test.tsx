import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DocsFields from '@/components/Docs/DocsFields/DocsFields';
import LocaleProvider from '@/localization/LocaleProvider';
import { createMockSchemaObject, mockInputTypeWithoutDescription } from '../../../mockSchema';

const schema = createMockSchemaObject();
const handleClickKeyMock = vi.fn();
const handleClickValueMock = vi.fn();

describe('DocsFields component', () => {
  test('renders DocsFields component with type information', () => {
    render(
      <LocaleProvider>
        <DocsFields
          type={schema.types[0]}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    expect(screen.getByText('id')).toBeInTheDocument();
  });
  test('renders DocsFields component without description', () => {
    render(
      <LocaleProvider>
        <DocsFields
          type={mockInputTypeWithoutDescription}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    expect(screen.getByText('No description')).toBeInTheDocument();
  });

  test('renders field information with links', () => {
    render(
      <LocaleProvider>
        <DocsFields
          type={schema.types[0]}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByText('id'));
    fireEvent.click(screen.getByText('ID'));

    expect(handleClickKeyMock).toHaveBeenCalled();
    expect(handleClickValueMock).toHaveBeenCalled();
  });
});
