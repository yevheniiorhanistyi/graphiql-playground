import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import Nav from '@/components/Nav/Nav';

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

describe('Nav Component', () => {
  test('renders without errors', async () => {
    render(<Nav />);

    await waitFor(() => {
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  test('toggles modal visibility on click', async () => {
    render(<Nav />);

    await waitFor(() => {
      const authenticateIcon = screen.getByTestId('authenticate-icon');
      const modal = screen.getByTestId('modal');
      expect(modal).not.toBeVisible();

      fireEvent.click(authenticateIcon);

      expect(modal).toBeVisible();

      fireEvent.click(authenticateIcon);

      expect(modal).not.toBeVisible();
    });
  });
});
