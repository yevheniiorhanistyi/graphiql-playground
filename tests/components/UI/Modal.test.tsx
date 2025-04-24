import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Modal from '@/components/UI/Modal/Modal';

const setVisibleMock = vi.fn();

describe('Modal Component', () => {
  test('renders without errors', () => {
    const { container } = render(
      <Modal visible={true} setVisible={setVisibleMock}>
        Modal Content
      </Modal>
    );

    expect(container).not.toBeNull();
  });

  test('calls setVisible when clicked outside the modal', () => {
    const { container } = render(
      <Modal visible={true} setVisible={setVisibleMock}>
        Modal Content
      </Modal>
    );

    fireEvent.click(container.firstChild as Element);

    expect(setVisibleMock).toHaveBeenCalledWith(false);
  });

  test('does not call setVisible when clicked inside the modal', () => {
    let isSetVisibleCalled = false;

    const setVisibleMock = (visible: boolean) => {
      if (visible) isSetVisibleCalled = true;
    };

    const { container } = render(
      <Modal visible={true} setVisible={setVisibleMock}>
        <div className="inner-content">Modal Content</div>
      </Modal>
    );

    fireEvent.click(container.querySelector('.inner-content') as Element);

    expect(isSetVisibleCalled).toBe(false);
  });
});
