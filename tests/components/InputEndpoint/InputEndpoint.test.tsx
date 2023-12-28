import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputEndpoint from '@/components/InputEndpoint/InputEndpoint';
import LocaleProvider from '@/localization/LocaleProvider';

const getEndpointMock = vi.fn();

describe('InputEndpoint component', () => {
  test('renders InputEndpoint component', () => {
    render(
      <LocaleProvider>
        <InputEndpoint getEndpoint={getEndpointMock} />
      </LocaleProvider>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('submits the form and updates the endpoint', async () => {
    render(
      <LocaleProvider>
        <InputEndpoint getEndpoint={getEndpointMock} />
      </LocaleProvider>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    await userEvent.type(inputElement, 'john.doe');
    await userEvent.click(screen.getByText('Submit'));

    expect(getEndpointMock).toHaveBeenCalledWith('john.doe');
  });
});
