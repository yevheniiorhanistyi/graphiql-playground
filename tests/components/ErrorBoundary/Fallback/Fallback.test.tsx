import { vi, describe, test, expect, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LocaleProvider from '@/localization/LocaleProvider';
import { Fallback } from '@/components/ErrorBoundary/Fallback/Fallback';
import { SMTH_WENT_WRONG, TRY_AGAIN } from '@/constants/stringConstants';

vi.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/error.svg" alt="Ooops, something went wrong..." />;
  },
}));
const reloadMock = vi.fn();

describe('Fallback component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });
  });

  test('renders Fallback component without error', () => {
    render(
      <LocaleProvider>
        <Fallback />
      </LocaleProvider>
    );
    expect(screen.getByAltText(SMTH_WENT_WRONG)).toBeInTheDocument();
    expect(screen.getByText(SMTH_WENT_WRONG)).toBeInTheDocument();
    expect(screen.getByText(TRY_AGAIN)).toBeInTheDocument();
  });

  test('handles button click', () => {
    render(
      <LocaleProvider>
        <Fallback />
      </LocaleProvider>
    );
    fireEvent.click(screen.getByText(TRY_AGAIN));

    expect(reloadMock).toHaveBeenCalled();
  });
});
