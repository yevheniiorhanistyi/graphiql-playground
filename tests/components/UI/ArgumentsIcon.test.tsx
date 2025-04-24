import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArgumentsIcon from '@/components/UI/ArgumentsIcon/ArgumentsIcon';

describe('ArgumentsIcon Component', () => {
  test('renders without errors', () => {
    const { container } = render(<ArgumentsIcon />);
    expect(container).not.toBeNull();
  });
});
