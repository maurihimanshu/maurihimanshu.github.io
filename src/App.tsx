import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {/* Enterprise Security: Blocks right-click, devtools shortcuts, and triggers exit intent modal */}
      <SecurityGuard />

      {/* Interactive Ambient Background animated on cursor movement */}
      <InteractiveBackground />

      {/* System Initialization Preloader */}
      {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}

      {/* Interactive Glowing Cursor */}
      <CustomCursor />

      <div className="min-h-screen flex flex-col bg-transparent text-slate-100 light:text-slate-900 transition-colors duration-300">
        {/* Navigation */}
        <Navbar />

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
    </ThemeProvider>
  );
};

export default App;
