import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { User } from 'firebase/auth';
import Router from '@/components/Nav/Router';
import * as Auth from '@/context/AuthContext';
import LocaleProvider from '@/localization/LocaleProvider';

const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: pushMock,
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

vi.mock('firebase/app', async () => {
  const actual = await vi.importActual('firebase/app');
  return {
    ...actual,
  };
});

describe('Router', () => {
  test('renders correctly when user is authenticated', async () => {
    vi.spyOn(Auth, 'useAuthContext').mockReturnValueOnce({
      authUser: { email: 'test', uid: '123', emailVerified: true } as User,
      isLoading: true,
    });

    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Playground')).toBeInTheDocument();
      expect(screen.queryByText('Sign In')).toBeNull();
    });
  });

  test('renders correctly when user is not authenticated', async () => {
    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
      expect(screen.queryByText('Playground')).toBeNull();
    });
  });

  test('calls handleAuth when button Sign In is clicked', async () => {
    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      const button = screen.getByText('Sign In').closest('button');
      if (button) fireEvent.click(button);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: 'auth',
        query: {
          form: 'signIn',
        },
      });
    });
  });
  test('calls handleAuth when button Sign Up is clicked', async () => {
    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      const button = screen.getByText('Sign Up').closest('button');
      if (button) fireEvent.click(button);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: 'auth',
        query: {
          form: 'signUp',
        },
      });
    });
  });
  test('calls navToPlayground when button Playground is clicked', async () => {
    vi.spyOn(Auth, 'useAuthContext').mockReturnValueOnce({
      authUser: { email: 'test', uid: '123', emailVerified: true } as User,
      isLoading: true,
    });
    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      const button = screen.getByText('Playground').closest('button');
      if (button) fireEvent.click(button);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: 'playground',
      });
    });
  });
  test('calls handleSignOut when button Sign Out is clicked', async () => {
    vi.spyOn(Auth, 'useAuthContext').mockReturnValueOnce({
      authUser: { email: 'test', uid: '123', emailVerified: true } as User,
      isLoading: true,
    });
    render(
      <LocaleProvider>
        <Auth.AuthContextProvider>
          <Router />
        </Auth.AuthContextProvider>
      </LocaleProvider>
    );

    await waitFor(() => {
      const button = screen.getByText('Sign Out').closest('button');
      if (button) fireEvent.click(button);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/',
      });
    });
  });
});
