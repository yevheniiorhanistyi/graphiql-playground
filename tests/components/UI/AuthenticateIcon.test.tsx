import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import AuthenticateIcon from '@/components/UI/AuthenticateIcon/AuthenticateIcon';

describe('AuthenticateIcon Component', () => {
  test('renders without errors', () => {
    const { container } = render(<AuthenticateIcon />);
    expect(container).not.toBeNull();
  });
});
