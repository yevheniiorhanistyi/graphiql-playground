import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Footer from '../../../src/components/Footer/Footer';

interface LinksTranslations {
  [key: string]: string;
}

describe('Footer component', () => {
  const authorsTranslations = {
    'Владимир Милашевский': 'Uladzimir Milasheuski',
    'Станислав Голобородов': 'Stanislav Goloborodov',
    'Евгений Органистый': 'Yevhenii Orhanistyi',
  };

  const linksTranslations: LinksTranslations = {
    'Владимир Милашевский': 'vladimirm89',
    'Станислав Голобородов': 'stanislavstranger',
    'Евгений Органистый': 'yevheniiorhanistyi',
  };

  test('renders authors links', () => {
    render(<Footer />);

    Object.keys(authorsTranslations).forEach((originalName) => {
      const href = linksTranslations[originalName];

      expect(screen.getByRole('link', { name: originalName })).toHaveAttribute(
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
