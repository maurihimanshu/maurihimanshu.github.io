import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Navbar } from './Navbar';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Navbar component', () => {
  it('renders brand and desktop nav items', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('Himanshu Kumar Home')).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Experience')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Architecture')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Technical Documentation/i)[0]).toBeInTheDocument();
  });

  it('updates background on scroll', () => {
    const { container } = render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-transparent');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header).toHaveClass('backdrop-blur-md');
  });

  it('toggles mobile menu open and closes when link is clicked', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(mobileMenuButton);

    const mobileLinks = screen.getAllByRole('link', { name: /skills/i });
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);

    // Click mobile link
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);

    // Re-open and click Get in Touch
    fireEvent.click(screen.getByLabelText('Open menu'));
    const getInTouchBtn = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(getInTouchBtn);

    // Re-open and click Docs link
    fireEvent.click(screen.getByLabelText('Open menu'));
    const mobileDocsLink = screen.getByRole('link', {
      name: /Technical Documentation & Architecture Guides/i,
    });
    fireEvent.click(mobileDocsLink);
  });

  it('toggles theme when theme toggle button is clicked', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const themeButtons = screen.getAllByLabelText('Toggle dark/light theme');
    fireEvent.click(themeButtons[0]);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('renders Open CLI button and calls onOpenCLI when clicked', () => {
    const handleOpenCLI = vi.fn();
    render(
      <ThemeProvider>
        <Navbar onOpenCLI={handleOpenCLI} />
      </ThemeProvider>
    );

    const openCliBtn = screen.getByRole('button', { name: /open cli/i });
    expect(openCliBtn).toBeInTheDocument();
    fireEvent.click(openCliBtn);
    expect(handleOpenCLI).toHaveBeenCalledTimes(1);
  });
});
