import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CloseIconButton from '@/components/UI/CloseIconButton/CloseIconButton';

describe('CloseIconButton Component', () => {
  test('renders without errors', () => {
    const { container } = render(<CloseIconButton />);
    expect(container).not.toBeNull();
  });
});
