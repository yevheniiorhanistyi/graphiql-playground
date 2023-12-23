import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import LocaleProvider from '@/localization/LocaleProvider';
import NotFoundPage from '@/pages/404';

describe('404 page', () => {
  test('render the 404 page without errors', () => {
    render(
      <LocaleProvider>
        <NotFoundPage />
      </LocaleProvider>
    );

    expect(screen.getByText('This page not found')).toBeInTheDocument();
  });
});
