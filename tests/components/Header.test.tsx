import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header/Header';

describe('Header tests', () => {
  test('should displayes correctly', () => {
    render(<Header />);
    expect(screen.getByText(/^header/i));
  });
});
