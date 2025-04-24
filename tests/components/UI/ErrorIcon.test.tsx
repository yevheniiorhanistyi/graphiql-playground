import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import ErrorIcon from '@/components/UI/ErrorIcon/ErrorIcon';

describe('ErrorIcon Component', () => {
  test('renders without errors', () => {
    const { container } = render(<ErrorIcon />);
    expect(container).not.toBeNull();
  });
});
