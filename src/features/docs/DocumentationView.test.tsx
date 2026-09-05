import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentationView } from './DocumentationView';
import { ThemeProvider } from '../../context/ThemeContext';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg data-testid="mermaid-svg"></svg>' }),
  },
}));

describe('DocumentationView feature', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.scrollIntoView = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  const renderDocs = (props = {}) => {
    const onBack = vi.fn();
    const result = render(
      <ThemeProvider>
        <DocumentationView onBackToPortfolio={onBack} {...props} />
      </ThemeProvider>
    );
    return { ...result, onBack };
  };

  it('renders default topic and navigation elements', () => {
    const { onBack } = renderDocs();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Expenso: 100% Offline Android Finance Architecture',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Zero-Knowledge Security Architecture')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Documentation & Architecture Guides')).toBeInTheDocument();

    // Click back to portfolio
    const backBtn = screen.getByLabelText('Back to Portfolio');
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalled();
  });

  it('collapses and expands folder groups when clicked', () => {
    renderDocs();

    // Verify fileName without .md extension is displayed
    expect(screen.getAllByText('expenso-android').length).toBeGreaterThanOrEqual(1);

    const folderBtn = screen.getByRole('button', { name: /Toggle folder Personal Projects/i });
    expect(
      screen.getByRole('button', {
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).toBeInTheDocument();

    // Collapse folder
    fireEvent.click(folderBtn);
    expect(
      screen.queryByRole('button', {
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).not.toBeInTheDocument();

    // Expand folder
    fireEvent.click(folderBtn);
    expect(
      screen.getByRole('button', {
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).toBeInTheDocument();
  });

  it('switches topics when sidebar links are clicked', () => {
    renderDocs();

    // Switch to AI Work Assistant
    const aiLink = screen.getByRole('button', {
      name: /AI Work Assistant/i,
    });
    fireEvent.click(aiLink);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /AI Work Assistant/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Local ML Inference')).toBeInTheDocument();

    // Switch to QR File Transfer
    const qrLink = screen.getByRole('button', {
      name: /Reliable Air-Gapped QR File Transfer Protocol/i,
    });
    fireEvent.click(qrLink);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Reliable Air-Gapped QR File Transfer Protocol/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Air-Gapped Isolation')).toBeInTheDocument();
  });

  it('filters topics via search query', () => {
    renderDocs();

    const searchInput = screen.getAllByPlaceholderText(/Search/i)[0];
    fireEvent.change(searchInput, { target: { value: 'Air-Gapped' } });

    // Should find QR File Transfer
    expect(
      screen.getByRole('button', {
        name: /Reliable Air-Gapped QR File Transfer Protocol/i,
      })
    ).toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(
      screen.getByRole('button', {
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).toBeInTheDocument();

    // Search specifically by file name without extension
    fireEvent.change(searchInput, { target: { value: 'ai-work' } });
    expect(
      screen.getByRole('button', {
        name: /ai-work-assistant/i,
      })
    ).toBeInTheDocument();
  });

  it('renders pure markdown documentation without hardcoded interactive widgets', () => {
    renderDocs({ initialTopicId: 'ai-work-assistant' });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /AI Work Assistant/i,
      })
    ).toBeInTheDocument();
    // Verify no hardcoded storybook widget
    expect(screen.queryByText('Live Interactive Component Preview')).not.toBeInTheDocument();
    // Verify markdown content is rendered
    expect(
      screen.getByRole('heading', { level: 2, name: 'System Architecture' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Offline Machine Learning Pipeline' })
    ).toBeInTheDocument();
  });

  it('renders Mermaid architecture diagrams in preview mode from markdown', async () => {
    renderDocs({ initialTopicId: 'expenso-android' });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Expenso: 100% Offline Android Finance Architecture',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Architecture Diagram')).toBeInTheDocument();
    expect(await screen.findByTestId('mermaid-svg')).toBeInTheDocument();
  });

  it('toggles mobile sidebar menu and theme switcher', () => {
    renderDocs();

    const mobileMenuBtn = screen.getByLabelText('Toggle navigation sidebar');
    fireEvent.click(mobileMenuBtn);

    // Mobile search input
    const mobileSearch = screen.getAllByPlaceholderText(/Search/i)[1];
    fireEvent.change(mobileSearch, { target: { value: 'Expenso' } });

    // Toggle theme
    const themeBtn = screen.getByLabelText('Toggle theme');
    fireEvent.click(themeBtn);

    // Close mobile menu
    fireEvent.click(mobileMenuBtn);
  });

  it('falls back to first topic when initialTopicId is invalid', () => {
    renderDocs({ initialTopicId: 'invalid-non-existent-topic' });
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Expenso: 100% Offline Android Finance Architecture',
      })
    ).toBeInTheDocument();
  });

  it('renders markdown links for repositories and external references from markdown body', () => {
    renderDocs({ initialTopicId: 'expenso-android' });
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).toBeInTheDocument();
    // Links are now directly in markdown
    expect(screen.getByRole('link', { name: /Google Play Store/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
    // Verify no bottom hardcoded section
    expect(screen.queryByText('External Repositories & Artifacts')).not.toBeInTheDocument();
  });

  it('scrolls into view when subtopics in On this page are clicked without redirecting', () => {
    const scrollMock = vi.fn();
    Element.prototype.scrollIntoView = scrollMock;

    renderDocs({ initialTopicId: 'expenso-android' });

    expect(screen.getByText('On this page')).toBeInTheDocument();
    const sectionBtn = screen.getByRole('button', { name: 'Clean Architecture Layers' });
    fireEvent.click(sectionBtn);

    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    // Also test fallback when element is not found
    vi.spyOn(document, 'getElementById').mockReturnValueOnce(null);
    fireEvent.click(sectionBtn);
  });
});
