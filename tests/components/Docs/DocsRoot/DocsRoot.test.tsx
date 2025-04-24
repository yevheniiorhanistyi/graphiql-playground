import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DocsRoot from '@/components/Docs/DocsRoot/DocsRoot';
import LocaleProvider from '@/localization/LocaleProvider';
import { createMockSchemaObject } from '../../../mockSchema';

const mockSchema = createMockSchemaObject();
const handleClickKeyMock = vi.fn();
const handleClickValueMock = vi.fn();

describe('DocsRoot component', () => {
  test('renders DocsRoot component with schema information', () => {
    render(
      <LocaleProvider>
        <DocsRoot
          schema={mockSchema}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    expect(screen.getByText('Root Types')).toBeInTheDocument();
  });

  test('toggles display of type information on click', () => {
    render(
      <LocaleProvider>
        <DocsRoot
          schema={mockSchema}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByText('string'));

    expect(screen.getByText('User type')).toBeInTheDocument();

    fireEvent.click(screen.getByText('ID'));
    expect(screen.getByText('ID')).toBeInTheDocument();
  });

  test('calls click handlers with the correct arguments', () => {
    render(
      <LocaleProvider>
        <DocsRoot
          schema={mockSchema}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByText('string'));

    expect(handleClickValueMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('id'));
    expect(handleClickKeyMock).toHaveBeenCalled();
  });
});
