import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import MainLoader from '@/components/MainLoader/MainLoader';

describe('MainLoader Component', () => {
  test('renders without errors', () => {
    const { container } = render(<MainLoader />);
    expect(container).not.toBeNull();
  });
});
