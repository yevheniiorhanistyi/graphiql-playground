import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import FieldsIcon from '@/components/UI/FieldsIcon/FieldsIcon';

describe('FieldsIcon Component', () => {
  test('renders without errors', () => {
    const { container } = render(<FieldsIcon />);
    expect(container).not.toBeNull();
  });
});
