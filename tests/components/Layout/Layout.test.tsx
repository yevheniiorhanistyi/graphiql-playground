import { vi, describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import Layout from '@/components/Layout/Layout';

vi.mock('@/theme/useTheme', () => ({
  __esModule: true,
  default: () => ({ theme: 'light' }),
}));

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

describe('Layout', () => {
  test('renders without errors', () => {
    const { getByTestId } = render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(getByTestId('child-content')).toBeInTheDocument();
  });
});
