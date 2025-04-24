import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';

import ToggleTheme from '@/components/UI/toggleTheme/ToggleTheme';
import { Theme, LOCAL_STORAGE_THEME_KEY } from '@/theme/ThemeContext';
import ThemeProvider from '@/theme/ThemeProvider';

describe('ToggleTheme Component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    );
  });

  test('toggles theme when clicked', () => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_THEME_KEY, Theme.DARK);
  });
});
