import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders footer contents and links', () => {
    render(<Footer />);

    expect(screen.getByText('Himanshu Kumar')).toBeInTheDocument();
    expect(screen.getByText('About & Background')).toBeInTheDocument();
    expect(screen.getByText('Experience & SME Tenure')).toBeInTheDocument();
    expect(screen.getByText('Interactive Banking Architecture')).toBeInTheDocument();
    expect(screen.getByText('tohimanshumail@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Architecture Docs & Guides')).toBeInTheDocument();
  });

  it('scrolls to top when back to top button is clicked', () => {
    render(<Footer />);

    const backToTopBtn = screen.getByLabelText('Back to top');
    fireEvent.click(backToTopBtn);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
