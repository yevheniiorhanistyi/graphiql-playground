import { vi, describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import DocsSchema from '@/components/Docs/DocsContent/DocsContent';
import LocaleProvider from '@/localization/LocaleProvider';
import {
  createMockSchemaObject,
  mockField,
  mockInputValue,
  mockInputTypeWithoutDescription,
  mockNonInputType,
} from '../../../mockSchema';

const setDocsStackMock = vi.fn();

const mockSchema = createMockSchemaObject();

describe('DocsSchema component', () => {
  test('renders DocsSchema component without errors', () => {
    const { container } = render(
      <DocsSchema
        schema={mockSchema}
        docsStack={[mockInputValue]}
        setDocsStack={setDocsStackMock}
      />
    );
    expect(container).not.toBeNull();
  });
  test('renders DocsRoot component when docsStack has only one element', () => {
    const { getByText } = render(
      <LocaleProvider>
        <DocsSchema
          schema={mockSchema}
          docsStack={[mockInputValue]}
          setDocsStack={setDocsStackMock}
        />
      </LocaleProvider>
    );
    expect(getByText('Root Types')).toBeInTheDocument();
  });
  test('renders DocsFields component when docsStack has more than one element and last element is __Type (non-input object)', () => {
    const { getByText } = render(
      <LocaleProvider>
        <DocsSchema
          schema={mockSchema}
          docsStack={[mockInputValue, mockInputTypeWithoutDescription]}
          setDocsStack={setDocsStackMock}
        />
      </LocaleProvider>
    );
    expect(getByText('Fields')).toBeInTheDocument();
  });
  test('renders DocsField component when docsStack has more than one element and last element is __Field with args', () => {
    const { getByText } = render(
      <LocaleProvider>
        <DocsSchema
          schema={mockSchema}
          docsStack={[mockInputValue, mockField]}
          setDocsStack={setDocsStackMock}
        />
      </LocaleProvider>
    );
    expect(getByText('Filter Character')).toBeInTheDocument();
  });
  test('renders DocsInputValues component when docsStack has more than one element and last element is __InputValue', () => {
    const { getByText } = render(
      <LocaleProvider>
        <DocsSchema
          schema={mockSchema}
          docsStack={[mockInputValue, mockField, mockInputValue]}
          setDocsStack={setDocsStackMock}
        />
      </LocaleProvider>
    );
    expect(getByText('String')).toBeInTheDocument();
  });
  test('does not render DocsFields component when last element in docsStack is not INPUT_OBJECT', () => {
    const { queryByText } = render(
      <LocaleProvider>
        <DocsSchema
          schema={mockSchema}
          docsStack={[mockInputValue, mockNonInputType]}
          setDocsStack={setDocsStackMock}
        />
      </LocaleProvider>
    );

    expect(queryByText('Fields')).not.toBeInTheDocument();
  });
});
