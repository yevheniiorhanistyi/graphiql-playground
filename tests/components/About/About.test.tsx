import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from '@/components/About/About';
import LocaleProvider from '@/localization/LocaleProvider';

describe('About Component', () => {
  test('renders without errors', () => {
    render(
      <LocaleProvider>
        <About />
      </LocaleProvider>
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders a list of about data items', () => {
    render(
      <LocaleProvider>
        <About />
      </LocaleProvider>
    );
    const listItem = screen.getByText('What have we learned in this course?');
    expect(listItem).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
