import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import confetti from 'canvas-confetti';
import { Contact } from './Contact';

describe('Contact feature', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders contact cards and triggers clipboard copies', async () => {
    render(<Contact />);

    expect(screen.getByText('tohimanshumail@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Kolkata, India')).toBeInTheDocument();

    const copyEmailBtn = screen.getByLabelText('Copy email');

    await act(async () => {
      fireEvent.click(copyEmailBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('tohimanshumail@gmail.com');
  });

  it('does not submit when required fields are missing', () => {
    render(<Contact />);

    const form = screen.getByRole('button', { name: /transmit message/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(screen.queryByText('Thank You! Message Dispatched')).not.toBeInTheDocument();
  });

  it('submits contact form successfully, shows celebration, and allows reset', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/sarah jenkins/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enterprise.com/i), {
      target: { value: 'jane@enterprise.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/senior software engineer/i), {
      target: { value: 'Job Opportunity' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/describe your requirements/i),
      {
        target: { value: 'We are hiring a Lead/SME engineer.' },
      }
    );

    const submitBtn = screen.getByRole('button', { name: /transmit message/i });
    fireEvent.click(submitBtn);

    // Advance submission delay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Thank You! Message Dispatched')).toBeInTheDocument();
    expect(screen.getByText('jane@enterprise.com')).toBeInTheDocument();

    // Click Send Another Message
    const resetBtn = screen.getByRole('button', { name: /send another message/i });
    fireEvent.click(resetBtn);

    expect(screen.getByRole('button', { name: /transmit message/i })).toBeInTheDocument();
  });

  it('catches confetti error gracefully if confetti fails', () => {
    // @ts-expect-error mockImplementation
    vi.mocked(confetti).mockImplementationOnce(() => {
      throw new Error('Canvas not supported');
    });

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/sarah jenkins/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enterprise.com/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/describe your requirements/i),
      {
        target: { value: 'Hello' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /transmit message/i }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Thank You! Message Dispatched')).toBeInTheDocument();
  });
});
