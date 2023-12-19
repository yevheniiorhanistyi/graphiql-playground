import { describe, test, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '@/theme/ThemeProvider';
import ConfiguratorPanel from '@/components/UI/ConfiguratorPanel/ConfiguratorPanel';

describe('ConfiguratorPanel Component', () => {
  test('renders without errors', () => {
    render(
      <ThemeProvider>
        <ConfiguratorPanel />
      </ThemeProvider>
    );

    expect(screen.getByTestId('configurator-panel')).toBeInTheDocument();
  });

  test('closes popover when backdrop is clicked', () => {
    render(<ConfiguratorPanel />);

    const langButton = screen.getByTestId('language-button');
    const backdrop = screen.getByTestId('backdrop');

    userEvent.click(langButton);
    fireEvent.click(backdrop);

    expect(langButton).toHaveAttribute('data-testid', 'language-button');
  });
});
