import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DocsArguments from '@/components/Docs/DocsArguments/DocsArguments';
import { __Field } from '@/interfaces/schemaInterface';

const mockField = {
  name: 'characters',
  description: 'Get the list of all characters',
  args: [
    {
      name: 'page',
      description: '',
      type: {
        kind: 'SCALAR',
        name: 'Int',
        ofType: null,
      },
      defaultValue: null,
    },
    {
      name: 'filter',
      description: '',
      type: {
        kind: 'INPUT_OBJECT',
        name: 'Filter Character',
        ofType: null,
      },
      defaultValue: null,
    },
  ],
  type: {
    kind: 'OBJECT',
    name: 'Characters',
    ofType: null,
  },
  isDeprecated: false,
  deprecationReason: null,
} as unknown as __Field;

const mockFieldWithoutArgs = {
  name: 'characters',
  description: 'Get the list of all characters',
  args: [],
  type: {
    kind: 'OBJECT',
    name: 'Characters',
    ofType: null,
  },
  isDeprecated: false,
  deprecationReason: null,
} as unknown as __Field;

const handleClickValueMock = vi.fn();

describe('DocsArguments component', () => {
  test('renders DocsArguments component with mock field', () => {
    render(<DocsArguments field={mockField} handleClickValue={handleClickValueMock} />);

    expect(screen.getByText('page')).toBeInTheDocument();
  });

  test('renders DocsArguments component without args', () => {
    render(<DocsArguments field={mockFieldWithoutArgs} handleClickValue={handleClickValueMock} />);

    expect(screen.queryByText(/(\w+: \w+,?)+/)).toBeNull();
  });

  test('calls handleClickValue when argument type is clicked', () => {
    render(<DocsArguments field={mockField} handleClickValue={handleClickValueMock} />);

    fireEvent.click(screen.getByText('Filter Character'));

    expect(handleClickValueMock).toHaveBeenCalledWith({
      kind: 'INPUT_OBJECT',
      name: 'Filter Character',
      ofType: null,
    });
  });
});
