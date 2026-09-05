import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MermaidDiagram } from './MermaidDiagram';
import { ThemeProvider } from '../../context/ThemeContext';
import mermaid from 'mermaid';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockImplementation((id: string, code: string) => {
      if (code.includes('syntax_error')) {
        return Promise.reject(new Error('Parse error on line 1'));
      }
      if (code.includes('non_error_exception')) {
        return Promise.reject('Raw string failure');
      }
      return Promise.resolve({
        svg: `<svg data-testid="mermaid-svg"><g id="diagram">${code}</g></svg>`,
      });
    }),
  },
}));

describe('MermaidDiagram', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (chart: string, theme: 'dark' | 'light' = 'dark') => {
    localStorage.setItem('hk_portfolio_theme', theme);
    return render(
      <ThemeProvider>
        <MermaidDiagram chart={chart} />
      </ThemeProvider>
    );
  };

  it('renders mermaid diagram SVG in preview mode by default', async () => {
    const chart = 'graph TD;\nA-->B;';
    await act(async () => {
      renderWithTheme(chart, 'dark');
    });

    expect(mermaid.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        startOnLoad: false,
        theme: 'dark',
      })
    );

    expect(screen.getByText('Architecture Diagram')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Source')).toBeInTheDocument();
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();
  });

  it('initializes with default theme when in light mode', async () => {
    const chart = 'graph LR;\nX-->Y;';
    await act(async () => {
      renderWithTheme(chart, 'light');
    });

    expect(mermaid.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        startOnLoad: false,
        theme: 'default',
      })
    );
  });

  it('allows toggling between Preview and Source code views', async () => {
    const chart = 'sequenceDiagram\nClient->>Server: Request';
    await act(async () => {
      renderWithTheme(chart);
    });

    // Default view is preview
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();

    // Click Source
    const sourceBtn = screen.getByLabelText('View diagram source code');
    fireEvent.click(sourceBtn);

    // Should now show CodeBlock with copy button
    expect(screen.getByText(/Client->>Server: Request/)).toBeInTheDocument();
    expect(screen.getByLabelText('Copy code to clipboard')).toBeInTheDocument();

    // Click Preview again
    const previewBtn = screen.getByLabelText('View diagram preview');
    fireEvent.click(previewBtn);
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();
  });

  it('displays error message when mermaid syntax parsing fails with Error instance', async () => {
    const brokenChart = 'graph TD;\nsyntax_error';
    await act(async () => {
      renderWithTheme(brokenChart);
    });

    expect(
      screen.getByText(/Diagram Syntax Error: Parse error on line 1/i)
    ).toBeInTheDocument();
  });

  it('displays generic error message when mermaid throws a non-Error object', async () => {
    const brokenChart = 'graph TD;\nnon_error_exception';
    await act(async () => {
      renderWithTheme(brokenChart);
    });

    expect(
      screen.getByText(/Diagram Syntax Error: Failed to render diagram/i)
    ).toBeInTheDocument();
  });
});
