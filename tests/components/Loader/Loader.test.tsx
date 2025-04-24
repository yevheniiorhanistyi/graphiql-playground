import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loader } from '@/components/Loader/Loader';

describe('Loader Component', () => {
  test('renders without errors', () => {
    const { container } = render(<Loader />);
    expect(container).not.toBeNull();
  });
});
