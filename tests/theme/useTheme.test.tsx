import { vi, describe, test, expect } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';

import { LOCAL_STORAGE_THEME_KEY, Theme } from '@/theme/ThemeContext';
import ThemeProvider from '@/theme/ThemeProvider';
import useTheme from '@/theme/useTheme';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p data-testid="theme">{theme}</p>
    </div>
  );
};

describe('useTheme', () => {
  test('toggles theme correctly', () => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeParagraph = screen.getByTestId('theme');
    const toggleButton = screen.getByText('Toggle Theme');

    expect(themeParagraph.textContent).toBe('light');

    fireEvent.click(toggleButton);

    expect(themeParagraph.textContent).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_THEME_KEY, Theme.DARK);

    fireEvent.click(toggleButton);

    expect(themeParagraph.textContent).toBe('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
  });
});
