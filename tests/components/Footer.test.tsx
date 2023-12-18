import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Footer from '../../src/components/Footer/Footer';

describe('Footer component', () => {
  test('renders authors links', () => {
    render(<Footer />);

    const expectedAuthors = [
      {
        name: 'Uladzimir Milasheuski',
        href: 'vladimirm89',
      },
      {
        name: 'Stanislav Goloborodov',
        href: 'stanislavstranger',
      },
      {
        name: 'Yevhenii Orhanistyi',
        href: 'yevheniiorhanistyi',
      },
    ];

    expectedAuthors.forEach((author) => {
      const { name, href } = author;
      expect(screen.getByRole('link', { name })).toHaveAttribute(
        'href',
        `https://github.com/${href}`
      );
    });
  });

  test('renders copyright text', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/2023 GraphiQL/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders React School logo with the correct link', () => {
    render(<Footer />);
    const allLinks = screen.getAllByRole('link');
    const linkWithCorrectHref = allLinks.find(
      (link) => link.getAttribute('href') === 'https://rs.school/react/'
    );
    expect(linkWithCorrectHref).toBeInTheDocument();
  });
});
