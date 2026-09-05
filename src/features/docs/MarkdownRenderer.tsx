import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline formatting: **bold**, *italic*, `code`, and [text](url).
 */
export function renderInline(text: string): React.ReactNode[] {
  // Regex splitting by markdown tokens
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-white light:text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-slate-200 light:text-slate-800">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-slate-800 light:bg-slate-100 text-cyan-400 light:text-cyan-700 border border-slate-700 light:border-slate-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 light:text-cyan-600 font-semibold underline underline-offset-2 hover:text-cyan-300 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

/**
 * Renders an enterprise code block with a one-click copy button.
 */
export const CodeBlock: React.FC<{ language: string; code: string }> = ({
  language,
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 light:border-slate-300 overflow-hidden bg-slate-950 light:bg-[#0b1120] text-slate-100 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-300">
        <pre>{code}</pre>
      </div>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Code blocks (```lang ... ```)
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      const fullCode = codeLines.join('\n');
      if (lang === 'mermaid') {
        elements.push(<MermaidDiagram key={`mermaid-${i}`} chart={fullCode} />);
      } else {
        elements.push(<CodeBlock key={`code-${i}`} language={lang} code={fullCode} />);
      }
      continue;
    }

    // Heading 2 (## Title)
    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace(/^##\s+/, '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-800 light:border-slate-200 scroll-mt-20 flex items-center gap-2"
        >
          {renderInline(title)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3 (### Title)
    if (trimmed.startsWith('### ')) {
      const title = trimmed.replace(/^###\s+/, '').trim();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg font-bold text-white light:text-slate-900 mt-6 mb-2"
        >
          {renderInline(title)}
        </h3>
      );
      i++;
      continue;
    }

    // Markdown Table (| Col 1 | Col 2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableRows.push(lines[i].trim());
        i++;
      }

      if (tableRows.length >= 2) {
        const headerCells = tableRows[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        // Row 1 is divider (|:---|:---|)
        const bodyRows = tableRows.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div
            key={`table-${i}`}
            className="my-6 overflow-x-auto rounded-xl border border-slate-800 light:border-slate-200"
          >
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900/80 light:bg-slate-100 text-cyan-400 light:text-cyan-700 font-mono border-b border-slate-800 light:border-slate-200">
                <tr>
                  {headerCells.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 font-semibold">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 light:divide-slate-200 bg-slate-950/40 light:bg-white text-slate-300 light:text-slate-700">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/30 light:hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else {
        tableRows.forEach((row, rIdx) => {
          elements.push(
            <p key={`table-row-${i}-${rIdx}`} className="my-3 text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed">
              {renderInline(row)}
            </p>
          );
        });
        continue;
      }
    }

    // Unordered List (- Item)
    if (trimmed.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().replace(/^- \s*/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-slate-300 light:text-slate-700 text-sm leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 light:bg-cyan-600 mt-2 shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List (1. Item)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 list-decimal list-inside text-slate-300 light:text-slate-700 text-sm leading-relaxed pl-2">
          {listItems.map((item, idx) => (
            <li key={idx}>
              <span className="text-slate-300 light:text-slate-700">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="my-3 text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed"
      >
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1 text-left">{elements}</div>;
};
