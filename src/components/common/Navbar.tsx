import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Terminal, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Button } from '../ui/Button';
import { personalInfo } from '../../data/portfolioData';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Projects', href: '#projects' },
  { label: 'Patents', href: '#patents' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const navItemSectionIds = navItems.map((item) => item.href.replace('#', ''));

export interface NavbarProps {
  onOpenCLI?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCLI }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const activeId = useScrollSpy(navItemSectionIds, 120);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (lastScrolled !== scrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 dark:bg-[#0b0f19]/85 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          aria-label="Himanshu Kumar Home"
        >
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform"
          >
            HK
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-100 light:text-slate-900 tracking-tight">
              <span>{personalInfo.name}</span>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
              >
                SME
              </span>
            </div>
            <div
              aria-hidden="true"
              className="text-[11px] text-slate-400 light:text-slate-500 font-mono flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Banking Platform Eng</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/80 p-1.5 rounded-full border border-slate-800/80 light:border-slate-200/80 backdrop-blur-md">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 font-semibold shadow-sm'
                    : 'text-slate-300 light:text-slate-600 hover:text-white light:hover:text-black hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="#docs"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 light:border-slate-300 text-xs font-mono font-semibold text-slate-300 light:text-slate-700 hover:border-cyan-500 hover:text-cyan-400 light:hover:text-cyan-700 hover:bg-slate-800/40 light:hover:bg-slate-100 transition-all"
            aria-label="Docs — Technical Documentation"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Docs</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-800 light:border-slate-300 text-slate-400 hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/60 light:hover:bg-slate-100 transition-all focus:outline-none"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a href="#contact">
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </a>

          <Button
            variant="primary"
            size="sm"
            icon={<Terminal className="w-3.5 h-3.5" />}
            onClick={onOpenCLI}
            aria-label="Open CLI"
          >
            Open CLI
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#docs"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 light:border-slate-300 text-xs font-mono text-cyan-400 bg-slate-900 light:bg-slate-100"
            aria-label="Docs — Technical Documentation"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-800 light:border-slate-300 text-slate-400"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 light:bg-slate-100 light:text-slate-700 light:hover:text-slate-900 light:border light:border-slate-300 focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 dark:bg-[#0b0f19]/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 px-6 py-5 space-y-3 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#docs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-mono font-medium flex items-center gap-2 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 col-span-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Technical Documentation & Architecture Guides</span>
            </a>
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                      : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-800 light:border-slate-200 flex gap-2">
            <a href="#contact" className="w-full" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
