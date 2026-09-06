import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { WebCLI } from './WebCLI';
import { ThemeProvider } from '../../context/ThemeContext';

describe('WebCLI component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Element.prototype.scrollIntoView = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  const renderCLI = (props: { isOpen?: boolean; onClose?: () => void } = {}) => {
    const onClose = props.onClose || vi.fn();
    const isOpen = props.isOpen !== undefined ? props.isOpen : true;
    const result = render(
      <ThemeProvider>
        <WebCLI isOpen={isOpen} onClose={onClose} />
      </ThemeProvider>
    );
    return { ...result, onClose };
  };

  it('does not render when isOpen is false', () => {
    renderCLI({ isOpen: false });
    expect(screen.queryByRole('dialog', { name: 'Web CLI Terminal' })).not.toBeInTheDocument();
  });

  it('does not render in mobile viewport (< 640px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    renderCLI({ isOpen: true });
    expect(screen.queryByRole('dialog', { name: 'Web CLI Terminal' })).not.toBeInTheDocument();
  });

  it('renders terminal window with banner when isOpen is true in desktop mode', () => {
    renderCLI({ isOpen: true });
    expect(screen.getByRole('dialog', { name: 'Web CLI Terminal' })).toBeInTheDocument();
    expect(
      screen.getByText(/HIMANSHU KUMAR — ENTERPRISE PORTFOLIO CLI/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/guest@himanshu-portfolio:~ \(zsh\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Terminal command input')).toBeInTheDocument();
  });

  it('executes user commands and updates terminal buffer', () => {
    renderCLI();

    const input = screen.getByLabelText('Terminal command input');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input);

    expect(screen.getByText('help')).toBeInTheDocument();
    expect(
      screen.getByText(/AVAILABLE SYSTEM COMMANDS/i)
    ).toBeInTheDocument();
  });

  it('ignores empty input submission', () => {
    renderCLI();

    const input = screen.getByLabelText('Terminal command input');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input);

    // No new user prompt line added (only the active prompt exists)
    expect(screen.getAllByText('guest@portfolio')).toHaveLength(1);
  });

  it('supports command history navigation with ArrowUp and ArrowDown', () => {
    renderCLI();

    const input = screen.getByLabelText('Terminal command input');

    // ArrowUp with empty history does nothing
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('');

    // Enter first command
    fireEvent.change(input, { target: { value: 'about' } });
    fireEvent.submit(input);

    // Enter second command
    fireEvent.change(input, { target: { value: 'skills' } });
    fireEvent.submit(input);

    // ArrowUp recalls previous command ('skills')
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('skills');

    // ArrowUp recalls earlier command ('about')
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('about');

    // ArrowUp again clamps to first command ('about')
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('about');

    // ArrowDown moves forward ('skills')
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect((input as HTMLInputElement).value).toBe('skills');

    // ArrowDown past end restores empty input
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect((input as HTMLInputElement).value).toBe('');

    // ArrowDown with historyIndex === -1 does nothing
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('supports autocomplete with Tab key for single and multiple matches', () => {
    renderCLI();

    const input = screen.getByLabelText('Terminal command input');

    // Single match: 'sk' -> 'skills'
    fireEvent.change(input, { target: { value: 'sk' } });
    fireEvent.keyDown(input, { key: 'Tab' });
    expect((input as HTMLInputElement).value).toBe('skills');

    // Multiple matches: 'e' -> outputs suggestions
    fireEvent.change(input, { target: { value: 'e' } });
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(screen.getByText(/Suggestions:/i)).toBeInTheDocument();

    // No matches: 'xyz' -> input remains unchanged and no suggestions added
    fireEvent.change(input, { target: { value: 'xyz' } });
    fireEvent.keyDown(input, { key: 'Tab' });
    expect((input as HTMLInputElement).value).toBe('xyz');
  });

  it('handles shortcuts Ctrl+L (clear) and Ctrl+C (cancel line)', () => {
    renderCLI();

    const input = screen.getByLabelText('Terminal command input');

    // Type command
    fireEvent.change(input, { target: { value: 'about' } });
    fireEvent.submit(input);
    expect(screen.getByText('about')).toBeInTheDocument();

    // Non-matching Ctrl key does nothing
    fireEvent.keyDown(input, { key: 'z', ctrlKey: true });
    expect(screen.getByText('about')).toBeInTheDocument();

    // Ctrl+L clears buffer
    fireEvent.keyDown(input, { key: 'l', ctrlKey: true });
    expect(screen.queryByText('about')).not.toBeInTheDocument();

    // Type text and cancel with Ctrl+C
    fireEvent.change(input, { target: { value: 'partial input' } });
    fireEvent.keyDown(input, { key: 'c', ctrlKey: true });
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('handles Escape key to close terminal', () => {
    const { onClose } = renderCLI();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('handles window controls: traffic lights and toolbar buttons', () => {
    const { onClose } = renderCLI();

    // Red traffic light closes window
    const redLight = screen.getByLabelText('Close terminal window');
    fireEvent.click(redLight);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Yellow traffic light clears buffer
    const yellowLight = screen.getByLabelText('Minimize or clear terminal');
    fireEvent.click(yellowLight);
    expect(screen.queryByText(/HIMANSHU KUMAR — ENTERPRISE PORTFOLIO CLI/i)).not.toBeInTheDocument();

    // Green traffic light toggles maximize
    const greenLight = screen.getByLabelText('Toggle terminal maximize');
    fireEvent.click(greenLight);

    // Clear toolbar button
    const clearBtn = screen.getByLabelText('Clear terminal buffer');
    fireEvent.click(clearBtn);

    // Maximize toolbar button
    const maxBtn = screen.getByLabelText('Maximize terminal');
    fireEvent.click(maxBtn);

    // Close toolbar button
    const closeBtn = screen.getByLabelText('Close terminal');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('copies terminal text buffer to clipboard', async () => {
    vi.useFakeTimers();
    renderCLI();

    const copyBtn = screen.getByLabelText('Copy terminal text');
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    // Advance 2000ms to revert copy icon
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Handles clipboard error gracefully
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error('Permission denied'));
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    vi.useRealTimers();
  });

  it('closes on backdrop click and focuses input on window click', () => {
    const { onClose } = renderCLI();

    const dialog = screen.getByRole('dialog', { name: 'Web CLI Terminal' });
    // Click backdrop
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalled();

    // Click inside terminal window
    const input = screen.getByLabelText('Terminal command input');
    const focusSpy = vi.spyOn(input, 'focus');
    const terminalWindow = input.closest('div');
    if (terminalWindow) {
      fireEvent.click(terminalWindow);
      expect(focusSpy).toHaveBeenCalled();
    }
  });

  it('executes clear and exit commands directly from input', () => {
    const { onClose } = renderCLI();
    const input = screen.getByLabelText('Terminal command input');

    // clear command
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(input);
    expect(screen.queryByText(/HIMANSHU KUMAR — ENTERPRISE PORTFOLIO CLI/i)).not.toBeInTheDocument();

    // exit command
    fireEvent.change(input, { target: { value: 'exit' } });
    fireEvent.submit(input);
    expect(onClose).toHaveBeenCalled();
  });
});
