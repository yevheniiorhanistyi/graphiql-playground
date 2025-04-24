import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocaleProvider from '@/localization/LocaleProvider';
import Docs from '@/components/Docs/Docs';
import { createMockSchemaObject } from '../../mockSchema';

const handleCloseMock = vi.fn();
const mockSchema = createMockSchemaObject();

describe('Docs component', () => {
  test('renders Docs component with a mock schema', () => {
    render(
      <LocaleProvider>
        <Docs schema={mockSchema} handleClose={handleCloseMock} />
      </LocaleProvider>
    );

    expect(screen.getByText('GraphQL Docs')).toBeInTheDocument();
  });
});
