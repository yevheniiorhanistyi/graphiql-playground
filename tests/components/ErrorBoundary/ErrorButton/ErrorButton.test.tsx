import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from '@/components/ErrorBoundary/ErrorButton/ErrorButton';
import LocaleProvider from '@/localization/LocaleProvider';
import { SMTH_WENT_WRONG } from '@/constants/stringConstants';

describe('ErrorButton component', () => {
  test('renders ErrorButton component without error', () => {
    render(
      <LocaleProvider>
        <ErrorButton />
      </LocaleProvider>
    );

    expect(screen.getByText('Show Error')).toBeInTheDocument();
  });

  test('throws error when button is clicked', () => {
    render(
      <LocaleProvider>
        <ErrorButton />
      </LocaleProvider>
    );

    expect(() => {
      fireEvent.click(screen.getByText('Show Error'));
    }).toThrowError(SMTH_WENT_WRONG);
  });
});
