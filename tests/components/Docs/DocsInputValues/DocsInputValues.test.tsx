import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DocsInputValues from '@/components/Docs/DocsInputValues/DocsInputValues';
import LocaleProvider from '@/localization/LocaleProvider';
import {
  mockInputType,
  mockInputTypeWithoutFields,
  mockInputTypeWithoutDescription,
} from '../../../mockSchema';

const handleClickKeyMock = vi.fn();
const handleClickValueMock = vi.fn();

describe('DocsInputValues component', () => {
  test('renders DocsInputValues component with input type', () => {
    render(
      <DocsInputValues
        type={mockInputType}
        handleClickKey={handleClickKeyMock}
        handleClickValue={handleClickValueMock}
      />
    );

    expect(screen.getByText('Mock input type description')).toBeInTheDocument();
  });

  test('calls handleClickKey when input field name is clicked', () => {
    render(
      <DocsInputValues
        type={mockInputType}
        handleClickKey={handleClickKeyMock}
        handleClickValue={handleClickValueMock}
      />
    );

    fireEvent.click(screen.getByText('field1:'));

    expect(handleClickKeyMock).toHaveBeenCalledWith({
      defaultValue: null,
      description: 'Field 1 description',
      name: 'field1',
      type: {
        kind: 'SCALAR',
        name: 'String',
        ofType: null,
      },
    });
  });

  test('calls handleClickValue when input field type is clicked', () => {
    render(
      <DocsInputValues
        type={mockInputType}
        handleClickKey={handleClickKeyMock}
        handleClickValue={handleClickValueMock}
      />
    );

    fireEvent.click(screen.getByText('String'));

    expect(handleClickValueMock).toHaveBeenCalledWith({
      kind: 'SCALAR',
      name: 'String',
      ofType: null,
    });
  });

  test('renders DocsInputValues component without inputFields', () => {
    render(
      <LocaleProvider>
        <DocsInputValues
          type={mockInputTypeWithoutFields}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    expect(screen.queryByText(/(\w+: \w+,?)+/)).toBeNull();
  });

  test('renders DocsInputValues component without description', () => {
    render(
      <LocaleProvider>
        <DocsInputValues
          type={mockInputTypeWithoutDescription}
          handleClickKey={handleClickKeyMock}
          handleClickValue={handleClickValueMock}
        />
      </LocaleProvider>
    );

    expect(screen.queryByText('No description')).toBeInTheDocument();
  });
});
