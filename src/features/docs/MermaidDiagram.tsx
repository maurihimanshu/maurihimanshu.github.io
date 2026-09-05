import React, { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../../context/ThemeContext';
import { Code, Eye } from 'lucide-react';
import { CodeBlock } from './MarkdownRenderer';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const { theme } = useTheme();
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      try {
        setError(null);
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        });

        const uniqueId = `mermaid-${rawId}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, chart.trim());
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart, theme, rawId]);

  return (
    <div className="my-6 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-950/80 light:bg-slate-50 overflow-hidden shadow-lg">
      {/* Header bar with Preview / Code switcher */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 light:bg-slate-200/70 border-b border-slate-800 light:border-slate-300 text-xs font-mono">
        <span className="font-bold text-cyan-400 light:text-cyan-700 uppercase tracking-wider">
          Architecture Diagram
        </span>
        <div className="flex items-center gap-1 bg-slate-950 light:bg-white p-0.5 rounded-lg border border-slate-800 light:border-slate-300">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            aria-label="View diagram preview"
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
              viewMode === 'preview'
                ? 'bg-cyan-500/20 text-cyan-400 light:text-cyan-700'
                : 'text-slate-400 hover:text-white light:hover:text-black'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('code')}
            aria-label="View diagram source code"
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
              viewMode === 'code'
                ? 'bg-cyan-500/20 text-cyan-400 light:text-cyan-700'
                : 'text-slate-400 hover:text-white light:hover:text-black'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Source</span>
          </button>
        </div>
      </div>

      {/* Content Canvas */}
      {viewMode === 'preview' ? (
        <div className="p-6 flex items-center justify-center overflow-x-auto min-h-[140px]">
          {error ? (
            <div className="text-xs text-amber-400 font-mono p-4 text-center">
              Diagram Syntax Error: {error}
            </div>
          ) : (
            <div
              className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      ) : (
        <div className="p-2">
          <CodeBlock language="mermaid" code={chart} />
        </div>
      )}
    </div>
  );
};
