import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LocaleProvider from '@/localization/LocaleProvider';
import GraphiQLPage from '@/components/GraphPlayground/GraphPlayground';

describe('GraphiQLPage component', () => {
  test('renders GraphiQLPage without errors', () => {
    const { container } = render(<GraphiQLPage />);
    expect(container).not.toBeNull();
  });

  test('executes query', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LocaleProvider>
        <GraphiQLPage />
      </LocaleProvider>
    );

    const queryInput = getByPlaceholderText('Enter code here...');
    const validQuery = '{ exampleQuery }';

    fireEvent.change(queryInput, { target: { value: validQuery } });

    expect(getByText('{ exampleQuery }')).toBeInTheDocument();
  });
  test('handles error during query execution', async () => {
    const errorMessage = 'Internal server error';
    const fetchMock = vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const { getByTestId, getByText } = render(
      <LocaleProvider>
        <GraphiQLPage />
      </LocaleProvider>
    );

    const endpointInput = getByTestId('endpoint');
    const executeButton = getByTestId('send-button');

    fireEvent.change(endpointInput, { target: { value: 'https://example.com/graphql' } });
    fireEvent.click(executeButton);

    waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });

    fetchMock.mockRestore();
  });
  test('enables Execute button when endpoint is set', () => {
    const { getByTestId } = render(
      <LocaleProvider>
        <GraphiQLPage />
      </LocaleProvider>
    );

    const executeButton = getByTestId('send-button') as HTMLButtonElement;
    const endpointInput = getByTestId('endpoint');

    fireEvent.change(endpointInput, { target: { value: 'https://example.com/graphql' } });

    expect(executeButton.disabled).toBe(false);
  });
});
