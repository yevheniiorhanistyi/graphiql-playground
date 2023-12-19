import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import LangButton from '@/components/LanguageButton/LanguageButton';

const handleOpenMock = vi.fn();
const handleCloseMock = vi.fn();

describe('LangButton', () => {
  test('renders LangButton correctly', () => {
    const { container } = render(
      <LangButton isPopoverOpen={false} handleOpen={handleOpenMock} handleClose={handleCloseMock} />
    );
    expect(container).toMatchSnapshot();
  });

  test('calls handleOpen when button is clicked', () => {
    render(
      <LangButton isPopoverOpen={false} handleOpen={handleOpenMock} handleClose={handleCloseMock} />
    );

    const langButton = screen.getByTestId('language-button');

    fireEvent.click(langButton);

    expect(handleOpenMock).toHaveBeenCalled();
  });

  test('calls onItemClick and handleClose when an item English is clicked', () => {
    render(
      <LangButton isPopoverOpen={false} handleOpen={handleOpenMock} handleClose={handleCloseMock} />
    );

    const langItem = screen.getByText('English');

    fireEvent.click(langItem);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('calls onItemClick and handleClose when an item Russian is clicked', () => {
    render(
      <LangButton isPopoverOpen={false} handleOpen={handleOpenMock} handleClose={handleCloseMock} />
    );

    const langItem = screen.getByText('Russian');

    fireEvent.click(langItem);

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
