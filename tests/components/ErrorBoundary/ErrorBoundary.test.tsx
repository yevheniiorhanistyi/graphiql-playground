import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { SMTH_WENT_WRONG } from '@/constants/stringConstants';

const FallbackComponent = () => <div>Fallback content</div>;

describe('ErrorBoundary component', () => {
  test('renders children without error when there is no error', () => {
    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(document.querySelector('div')).toHaveTextContent('Child content');
    expect(document.querySelector('div')).not.toHaveTextContent('Fallback content');
  });

  test('renders fallback content when there is an error', () => {
    const ThrowError = () => {
      throw new Error(SMTH_WENT_WRONG);
    };

    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback content')).toBeVisible();
  });
});
