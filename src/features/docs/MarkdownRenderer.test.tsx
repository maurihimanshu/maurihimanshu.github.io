import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MarkdownRenderer, renderInline, CodeBlock } from './MarkdownRenderer';
import { ThemeProvider } from '../../context/ThemeContext';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg data-testid="mermaid-svg"></svg>' }),
  },
}));

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  describe('renderInline', () => {
    it('renders bold, italic, code, and link elements correctly', () => {
      render(
        <div>
          {renderInline(
            'This is **bold**, this is *italic*, this is `code`, and a [Click Here](https://example.com).'
          )}
        </div>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
      expect(screen.getByText('code')).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'Click Here' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('CodeBlock', () => {
    it('renders code snippet and handles copy to clipboard with timer', async () => {
      vi.useFakeTimers();
      render(<CodeBlock language="typescript" code="const x = 1;" />);

      expect(screen.getByText(/typescript/i)).toBeInTheDocument();
      expect(screen.getByText('const x = 1;')).toBeInTheDocument();

      const copyBtn = screen.getByLabelText('Copy code to clipboard');
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1;');
      expect(screen.getByText('Copied!')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2100);
      });

      expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe('MarkdownRenderer component', () => {
    it('renders headings, tables, lists, and code blocks', () => {
      const markdown = `
## Architecture Overview

Here is a paragraph with **strong** text.

### Detailed Subsystem

- First bullet item
- Second bullet item

1. Step one
2. Step two

| Parameter | Type | Default |
| :--- | :--- | :--- |
| timeout | integer | 3000ms |

\`\`\`java
public class TestService {}
\`\`\`
`;

      render(<MarkdownRenderer content={markdown} />);

      expect(
        screen.getByRole('heading', { level: 2, name: 'Architecture Overview' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Detailed Subsystem' })
      ).toBeInTheDocument();
      expect(screen.getByText(/Here is a paragraph with/i)).toBeInTheDocument();
      expect(screen.getByText('First bullet item')).toBeInTheDocument();
      expect(screen.getByText('Step one')).toBeInTheDocument();
      expect(screen.getByText('timeout')).toBeInTheDocument();
      expect(screen.getByText('3000ms')).toBeInTheDocument();
      expect(screen.getByText(/java/i)).toBeInTheDocument();
      expect(screen.getByText('public class TestService {}')).toBeInTheDocument();
    });

    it('handles CodeBlock without language and incomplete table rows', () => {
      render(<CodeBlock language="" code="echo hello" />);
      expect(screen.getByText('code')).toBeInTheDocument();

      const incompleteTable = `
| lone cell |
Just standard text following.
`;
      render(<MarkdownRenderer content={incompleteTable} />);
      expect(screen.getByText('Just standard text following.')).toBeInTheDocument();
    });

    it('renders MermaidDiagram for ```mermaid code blocks', async () => {
      const mermaidMarkdown = `
## Flow
\`\`\`mermaid
graph TD;
  A-->B;
\`\`\`
`;
      await act(async () => {
        render(
          <ThemeProvider>
            <MarkdownRenderer content={mermaidMarkdown} />
          </ThemeProvider>
        );
      });

      expect(screen.getByText('Architecture Diagram')).toBeInTheDocument();
      expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();
    });
  });
});
