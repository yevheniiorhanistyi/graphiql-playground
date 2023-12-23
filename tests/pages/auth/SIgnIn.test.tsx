import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthPage from '@/pages/auth';
import LocaleProvider from '@/localization/LocaleProvider';

describe('AuthPage component', () => {
  test('renders Sign In form when query.form is signIn', async () => {
    vi.mock(
      'next/router',
      vi.fn().mockReturnValueOnce({
        useRouter: () => ({
          query: { form: 'signIn' },
        }),
      })
    );

    render(
      <LocaleProvider>
        <AuthPage />
      </LocaleProvider>
    );

    expect(screen.getByText('Enter email and password to Sign In')).toBeInTheDocument();
    expect(screen.getByText('You are already registered?')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
