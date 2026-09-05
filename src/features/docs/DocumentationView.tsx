import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  Info,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Folder,
  FolderOpen,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { loadDocTopics, groupTopicsByFolder, DocTopic } from './docsLoader';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DocumentationViewProps {
  onBackToPortfolio: () => void;
  initialTopicId?: string;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  onBackToPortfolio,
  initialTopicId,
}) => {
  const { theme, toggleTheme } = useTheme();

  // Load topics dynamically from docsLoader
  const { topics: allTopics, folderGroups: initialGroups } = useMemo(
    () => loadDocTopics(),
    []
  );

  const defaultTopic = allTopics[0];

  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialTopicId || defaultTopic.id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  // Handle URL hash changes like #docs?topic=expenso-android
  useEffect(() => {
    if (initialTopicId) {
      setActiveTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  // Find active topic
  const activeTopic: DocTopic = useMemo(() => {
    return allTopics.find((t) => t.id === activeTopicId) || defaultTopic;
  }, [activeTopicId, allTopics, defaultTopic]);

  // Filter topics based on search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return allTopics;
    const q = searchQuery.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.fileName.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.folder.toLowerCase().includes(q)
    );
  }, [searchQuery, allTopics]);

  // Group filtered topics by folder
  const folderGroups = useMemo(() => {
    return groupTopicsByFolder(filteredTopics);
  }, [filteredTopics]);

  const toggleFolder = (folderName: string) => {
    setCollapsedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <ShieldAlert className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getCalloutClasses = (type: string) => {
    switch (type) {
      case 'security':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 light:bg-emerald-50 light:text-emerald-900 light:border-emerald-300';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-300 light:bg-amber-50 light:text-amber-900 light:border-amber-300';
      case 'info':
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 light:bg-cyan-50 light:text-cyan-900 light:border-cyan-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 dark:bg-[#080c14] light:bg-white text-slate-100 light:text-slate-900 font-sans transition-colors duration-200">
      {/* Sticky Enterprise Topbar Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800 light:border-slate-200 bg-slate-950/90 dark:bg-[#080c14]/90 light:bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              aria-label="Back to Portfolio"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 hover:border-cyan-500 hover:text-cyan-400 light:hover:text-cyan-600 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-800 light:bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm text-white light:text-slate-900">
                Enterprise Documentation & Architecture Guides
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                v2.0.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-xs text-slate-200 light:text-slate-800 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white light:hover:text-black bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Toggle navigation sidebar"
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white light:hover:text-black bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 transition-colors"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3-Column Enterprise Documentation Layout */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex relative">
        {/* Left Navigation Sidebar */}
        <aside
          className={`fixed lg:sticky top-[57px] left-0 bottom-0 z-20 w-72 lg:w-64 border-r border-slate-800 light:border-slate-200 bg-slate-950 dark:bg-[#080c14] light:bg-slate-50/95 overflow-y-auto p-4 transition-transform duration-200 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{ height: 'calc(100vh - 57px)' }}
        >
          {/* Mobile search */}
          <div className="mb-4 sm:hidden">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-xs"
            />
          </div>

          <div className="space-y-4">
            {folderGroups.map(({ folder, topics }) => {
              const isCollapsed = !!collapsedFolders[folder];
              return (
                <div key={folder} className="space-y-1">
                  {/* Collapsible Folder Header */}
                  <button
                    onClick={() => toggleFolder(folder)}
                    aria-label={`Toggle folder ${folder}`}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs font-mono font-bold uppercase tracking-wider text-slate-300 light:text-slate-700 hover:bg-slate-900 light:hover:bg-slate-200/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isCollapsed ? (
                        <Folder className="w-4 h-4 text-cyan-500/70" />
                      ) : (
                        <FolderOpen className="w-4 h-4 text-cyan-400" />
                      )}
                      <span>{folder}</span>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>

                  {/* List of Files in Folder */}
                  {!isCollapsed && (
                    <ul className="space-y-1 pl-2 border-l border-slate-800 light:border-slate-200 ml-3">
                      {topics.map((topic) => {
                        const isActive = topic.id === activeTopic.id;
                        return (
                          <li key={topic.id}>
                            <button
                              onClick={() => {
                                setActiveTopicId(topic.id);
                                setMobileSidebarOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-2 rounded-lg transition-all group ${
                                isActive
                                  ? 'bg-cyan-500/10 light:bg-cyan-50 text-cyan-400 light:text-cyan-700 border border-cyan-500/30'
                                  : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-black hover:bg-slate-900/50 light:hover:bg-slate-200/60'
                              }`}
                            >
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5">
                                  <FileText
                                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                                    }`}
                                  />
                                  <span
                                    className={`font-mono font-bold text-xs truncate ${
                                      isActive
                                        ? 'text-cyan-300 light:text-cyan-800'
                                        : 'text-slate-200 light:text-slate-800 group-hover:text-white light:group-hover:text-black'
                                    }`}
                                  >
                                    {topic.fileName}
                                  </span>
                                </div>
                                <span
                                  className={`text-[11px] truncate pl-5 font-normal ${
                                    isActive
                                      ? 'text-cyan-400/80 light:text-cyan-700'
                                      : 'text-slate-400 light:text-slate-500 group-hover:text-slate-300'
                                  }`}
                                >
                                  {topic.title}
                                </span>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Documentation Reading Canvas */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 text-left space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-400 light:text-slate-500">
            {activeTopic.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                <span className={idx === activeTopic.breadcrumbs.length - 1 ? 'text-cyan-400 light:text-cyan-700 font-semibold' : ''}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Title & Summary */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
              {activeTopic.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 light:text-slate-600 leading-relaxed max-w-3xl">
              {activeTopic.summary}
            </p>
          </div>

          {/* Callout Notice Box */}
          {activeTopic.callout && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3.5 ${getCalloutClasses(
                activeTopic.callout.type
              )}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getCalloutIcon(activeTopic.callout.type)}
              </div>
              <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                <p className="font-bold tracking-wide">{activeTopic.callout.title}</p>
                <p className="opacity-90">{activeTopic.callout.message}</p>
              </div>
            </div>
          )}

          {/* Render Markdown Content */}
          <MarkdownRenderer content={activeTopic.markdown} />
        </main>

        {/* Right Sticky Sidebar ("On this page") */}
        <aside
          className="hidden xl:block w-56 sticky top-[57px] p-6 text-left border-l border-slate-800 light:border-slate-200 overflow-y-auto"
          style={{ height: 'calc(100vh - 57px)' }}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-semibold mb-3">
            On this page
          </div>
          <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
            {activeTopic.sections.map((sec) => (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="hover:text-cyan-400 light:hover:text-cyan-700 transition-colors text-left block w-full truncate cursor-pointer"
                >
                  {sec.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
