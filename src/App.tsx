import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { InteractiveBackground } from './components/common/InteractiveBackground';
import { SecurityGuard } from './components/common/SecurityGuard';
import { InitialLoader } from './components/common/InitialLoader';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Experience } from './features/experience/Experience';
import { SystemArchitecture } from './features/architecture/SystemArchitecture';
import { Projects } from './features/projects/Projects';
import { Patents } from './features/patents/Patents';
import { Certifications } from './features/certifications/Certifications';
import { Contact } from './features/contact/Contact';

const DocumentationView = React.lazy(() =>
  import('./features/docs/DocumentationView').then((m) => ({ default: m.DocumentationView }))
);
const WebCLI = React.lazy(() =>
  import('./features/cli/WebCLI').then((m) => ({ default: m.WebCLI }))
);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'portfolio' | 'docs'>('portfolio');
  const [docsTopicId, setDocsTopicId] = useState<string | undefined>(undefined);
  const [isCliOpen, setIsCliOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#docs')) {
        setCurrentView('docs');
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const topic = params.get('topic');
        setDocsTopicId(topic || undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('portfolio');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToPortfolio = () => {
    window.location.hash = '#projects';
    setCurrentView('portfolio');
  };

  return (
    <ThemeProvider>
      {/* Enterprise Security: Blocks right-click, devtools shortcuts, and triggers native browser exit prompt */}
      <SecurityGuard />

      {/* Interactive Ambient Background animated on cursor movement */}
      <InteractiveBackground />

      {/* System Initialization Preloader */}
      {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}

      {/* Interactive Glowing Cursor */}
      <CustomCursor />

      {currentView === 'docs' ? (
        <React.Suspense
          fallback={
            <div
              role="status"
              aria-label="Loading Documentation"
              className="min-h-screen flex items-center justify-center bg-[#070b14] text-cyan-400 font-mono text-xs tracking-wider"
            >
              INITIALIZING ARCHITECTURE DOCUMENTATION...
            </div>
          }
        >
          <DocumentationView
            onBackToPortfolio={handleBackToPortfolio}
            initialTopicId={docsTopicId}
          />
        </React.Suspense>
      ) : (
        <div className="min-h-screen flex flex-col bg-transparent text-slate-100 light:text-slate-900 transition-colors duration-300">
          {/* Navigation */}
          <Navbar onOpenCLI={() => setIsCliOpen(true)} />

          {/* Main Content Sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <SystemArchitecture />
            <Projects />
            <Patents />
            <Certifications />
            <Contact />
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      )}

      {/* In-Browser Web CLI Terminal */}
      {isCliOpen && (
        <React.Suspense fallback={null}>
          <WebCLI isOpen={isCliOpen} onClose={() => setIsCliOpen(false)} />
        </React.Suspense>
      )}
    </ThemeProvider>
  );
};

export default App;
