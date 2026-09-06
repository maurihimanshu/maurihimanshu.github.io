import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  CommandLineEntry,
  CommandContext,
  executeCommand,
  getCompletions,
} from './cliCommands';

export interface WebCLIProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME_BANNER: CommandLineEntry = {
  id: 'welcome-banner',
  type: 'system',
  content: (
    <div className="space-y-1 text-xs font-mono border-b border-slate-800/80 pb-3 mb-2">
      <div className="text-cyan-400 font-bold tracking-wider">
        ======================================================================
      </div>
      <div className="text-cyan-300 font-extrabold text-sm sm:text-base">
        HIMANSHU KUMAR — ENTERPRISE PORTFOLIO CLI [v2.4.0]
      </div>
      <div className="text-slate-400 text-[11px]">
        Team SME | Core Banking & Distributed Systems Architect
      </div>
      <div className="text-slate-500 text-[11px] pt-1">
        Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to list available commands, <span className="text-cyan-400 font-bold">&apos;projects&apos;</span> to view architecture, or <span className="text-amber-400 font-bold">&apos;exit&apos;</span> to close.
      </div>
      <div className="text-cyan-400 font-bold tracking-wider">
        ======================================================================
      </div>
    </div>
  ),
};

export const WebCLI: React.FC<WebCLIProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [entries, setEntries] = useState<CommandLineEntry[]>([WELCOME_BANNER]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Desktop check: Only render in desktop mode (>= 640px)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;

  // Auto-scroll to bottom whenever entries update
  const scrollToBottom = useCallback(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, entries, scrollToBottom]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commandContext: CommandContext = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      closeTerminal: onClose,
      clearBuffer: () => setEntries([]),
    }),
    [theme, toggleTheme, setTheme, onClose]
  );

  if (!isOpen || !isDesktop) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Record user command entry
    const userEntry: CommandLineEntry = {
      id: `input-${Date.now()}-${Math.random()}`,
      type: 'input',
      command: trimmed,
      content: (
        <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
          <span className="text-emerald-400 font-bold">guest@portfolio</span>
          <span className="text-slate-500">:</span>
          <span className="text-cyan-400 font-bold">~</span>
          <span className="text-slate-400">$</span>
          <span className="text-white font-semibold">{trimmed}</span>
        </div>
      ),
    };

    // Update history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Execute command
    const result = executeCommand(trimmed, commandContext);
    const lowerCmd = trimmed.toLowerCase();
    if (lowerCmd !== 'clear' && lowerCmd !== 'cls') {
      setEntries((prev) => [...prev, userEntry, ...result]);
    }

    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History Navigation: ArrowUp
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    // History Navigation: ArrowDown
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
      return;
    }

    // Autocomplete: Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getCompletions(inputValue);
      if (completions.length === 1) {
        setInputValue(completions[0]);
      } else if (completions.length > 1) {
        // Output suggestions
        const suggestionEntry: CommandLineEntry = {
          id: `suggestion-${Date.now()}`,
          type: 'system',
          content: (
            <div className="text-xs font-mono text-cyan-400/80">
              Suggestions: {completions.join('   ')}
            </div>
          ),
        };
        setEntries((prev) => [...prev, suggestionEntry]);
      }
      return;
    }

    // Shortcut: Ctrl+L to clear screen
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setEntries([]);
      return;
    }

    // Shortcut: Ctrl+C to cancel current line
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInputValue('');
      return;
    }
  };

  const handleCopyBuffer = async () => {
    /* v8 ignore start */
    if (!terminalContentRef.current) return;
    /* v8 ignore stop */
    try {
      const text = terminalContentRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Web CLI Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md transition-opacity animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Terminal Window Container */}
      <div
        className={`relative flex flex-col rounded-2xl bg-slate-950 dark:bg-[#070b13] border border-slate-800 light:border-slate-700 shadow-2xl overflow-hidden transition-all duration-300 w-full ${
          isMaximized
            ? 'h-[94vh] max-w-[96vw]'
            : 'h-[600px] max-w-4xl max-h-[85vh]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 light:bg-slate-900 border-b border-slate-800 text-xs font-mono select-none">
          {/* macOS Style Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close terminal window"
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
            />
            <button
              onClick={() => setEntries([])}
              aria-label="Minimize or clear terminal"
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
            />
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              aria-label="Toggle terminal maximize"
              className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
            />
          </div>

          {/* Terminal Title */}
          <div className="flex items-center gap-2 text-slate-400 font-semibold truncate px-2">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate">guest@himanshu-portfolio:~ (zsh)</span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEntries([]);
              }}
              aria-label="Clear terminal buffer"
              className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
              title="Clear buffer (Ctrl+L)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyBuffer();
              }}
              aria-label="Copy terminal text"
              className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
              title="Copy output"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((prev) => !prev);
              }}
              aria-label="Maximize terminal"
              className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
              title={isMaximized ? 'Restore window' : 'Maximize window'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close terminal"
              className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors ml-1"
              title="Close terminal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          ref={terminalContentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 font-mono text-xs leading-relaxed text-slate-200 select-text"
        >
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-1">
              {entry.content}
            </div>
          ))}

          {/* Active Command Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold select-none flex-shrink-0">
              <span>guest@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400 font-bold">~</span>
              <span className="text-slate-400">$</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal command input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-cyan-400 p-0 m-0 focus:ring-0"
            />
          </form>

          <div ref={terminalBottomRef} />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
            <span>UTF-8</span>
            <span>zsh 5.9</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Type &apos;help&apos; for list</span>
            <span>Press Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
