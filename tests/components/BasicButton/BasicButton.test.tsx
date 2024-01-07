import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import BasicButton from '@/components/common/BasicButton/BasicButton';

describe('BasicButton Component', () => {
  test('renders button with provided children', () => {
    render(<BasicButton>Click me</BasicButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies custom styles to the button', () => {
    const customStyles = { backgroundColor: 'red', color: 'white' };
    render(<BasicButton customStyles={customStyles}>Styled Button</BasicButton>);
    const button = screen.getByText('Styled Button').closest('button');
    const expectedBackgroundColor = 'rgb(255, 0, 0)';
    const expectedColor = 'rgb(255, 255, 255)';

    expect(button).toHaveStyle(
      `background-color: ${expectedBackgroundColor}; color: ${expectedColor};`
    );
  });

  test('applies active class when active prop is true', () => {
    render(<BasicButton active>Active Button</BasicButton>);
    const button = screen.getByText('Active Button').closest('button');

    expect(button?.classList.toString()).toMatch(/active/);
  });

  test('handles click events correctly', () => {
    const handleClick = vi.fn();
    render(<BasicButton onClick={handleClick}>Click me</BasicButton>);
    const button = screen.getByText('Click me').closest('button');
    if (button) fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as submit button when type is set to submit', () => {
    render(<BasicButton type="submit">Submit</BasicButton>);
    const button = screen.getByText('Submit').closest('button');
    expect(button?.classList.toString()).toMatch(/submit/);
  });
});
