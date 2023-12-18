import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from '@/components/About/About';

describe('About Component', () => {
  test('renders without errors', () => {
    render(<About />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders a list of about data items', () => {
    render(<About />);
    const listItem = screen.getByText('What have we learned in this course?');
    expect(listItem).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
