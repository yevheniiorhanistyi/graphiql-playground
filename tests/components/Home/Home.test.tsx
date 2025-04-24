import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as Auth from '@/context/AuthContext';
import { User } from 'firebase/auth';
import LocaleProvider from '@/localization/LocaleProvider';
import Home from '@/components/Home/Home';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

describe('Home component', () => {
  test('renders the home component without errors', () => {
    render(
      <LocaleProvider>
        <Home />
      </LocaleProvider>
    );

    expect(screen.getByText('Welcome to GraphiQL Playground!')).toBeInTheDocument();
  });
  test('renders the home component without errors', () => {
    vi.spyOn(Auth, 'useAuthContext').mockReturnValueOnce({
      authUser: { email: 'test', uid: '123', emailVerified: true } as User,
      isLoading: true,
    });
    render(
      <LocaleProvider>
        <Home />
      </LocaleProvider>
    );

    expect(screen.getByText('Go to Playground page')).toBeInTheDocument();
  });
});
