import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import BackIconButton from '@/components/UI/BackIconButton/BackIconButton';

describe('BackIconButton Component', () => {
  test('renders without errors', () => {
    const { container } = render(<BackIconButton />);
    expect(container).not.toBeNull();
  });
});
