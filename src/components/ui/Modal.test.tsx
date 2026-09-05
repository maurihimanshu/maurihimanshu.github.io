import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal component', () => {
  beforeEach(() => {
    document.body.style.overflow = 'unset';
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title, subtitle, children and locks body scroll when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Banking Modal"
        subtitle="Subtitle text"
        maxWidth="4xl"
      >
        Modal Body
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Banking Modal')).toBeInTheDocument();
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
    expect(screen.getByText('Modal Body')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    const backdrop = container.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Other keys do not trigger close
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('resets body overflow when unmounted', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        Content
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });
});
