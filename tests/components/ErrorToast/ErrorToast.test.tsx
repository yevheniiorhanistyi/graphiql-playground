import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import ErrorToast from '@/components/ErrorToast/ErrorToast';

describe('ErrorToast component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('closes error toast when close button is clicked', () => {
    const setErrorMessageMock = vi.fn();
    const errorMessage = 'Example error message';
    const errorDescription = 'Example error description';

    const { getByText } = render(
      <ErrorToast
        errorMessage={errorMessage}
        errorDescription={errorDescription}
        setErrorMessage={setErrorMessageMock}
      />
    );

    const closeButton = getByText('✕');

    fireEvent.click(closeButton);

    expect(setErrorMessageMock).toHaveBeenCalledTimes(1);
    expect(setErrorMessageMock).toHaveBeenCalledWith(null);
  });

  test('automatically closes error toast after a certain time', async () => {
    const setErrorMessageMock = vi.fn();
    const errorMessage = 'Example error message';
    const errorDescription = 'Example error description';

    render(
      <ErrorToast
        errorMessage={errorMessage}
        errorDescription={errorDescription}
        setErrorMessage={setErrorMessageMock}
      />
    );
    await act(() => vi.runAllTimers());
    expect(setErrorMessageMock).toHaveBeenCalled();
  });
});
