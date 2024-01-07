import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import LocaleProvider from '@/localization/LocaleProvider';
import MainPage from '@/pages';

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

describe('Main page', () => {
  test('render the Main page without errors', () => {
    render(
      <LocaleProvider>
        <MainPage />
      </LocaleProvider>
    );

    expect(screen.getByText('Welcome to GraphiQL Playground!')).toBeInTheDocument();
  });
});
