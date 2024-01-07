import { vi, describe, test, expect } from 'vitest';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import Header from '@/components/Header/Header';

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

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('applies sticky class on scroll', async () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    await waitFor(() => {
      const header = screen.getByTestId('header');
      const computedStyle = window.getComputedStyle(header);
      expect(computedStyle.getPropertyValue('box-shadow')).toBe(
        '0px 0.1rem 1rem rgba(0, 0, 0, 0.4)'
      );
    });
  });
});
