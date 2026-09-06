import React from 'react';
import { Mail, MapPin, Shield, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 light:border-slate-200 bg-slate-950/80 dark:bg-[#080c14] light:bg-slate-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                HK
              </div>
              <span className="font-bold text-lg text-white light:text-slate-900">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 light:text-slate-600 max-w-md leading-relaxed">
              Software Engineer & Subject Matter Expert (SME) specializing in high-throughput digital banking microservices,
              Kafka event streaming architectures, reactive Spring Boot systems, and enterprise cloud solutions.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-cyan-400 light:text-cyan-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> 80%+ CI/CD Quality Standard
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 light:text-slate-800 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 light:text-slate-600">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">
                  Experience & SME Tenure
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-cyan-400 transition-colors">
                  Interactive Banking Architecture
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Key Projects & Case Studies
                </a>
              </li>
              <li>
                <a href="#patents" className="hover:text-cyan-400 transition-colors">
                  Granted Patents
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-400/90 font-medium">
                  <span>Architecture Docs & Guides</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-cyan-500/10 border border-cyan-500/30">DOCS</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 light:text-slate-800 font-semibold">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-sm text-slate-400 light:text-slate-600">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span className="truncate">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 light:bg-slate-200 hover:text-cyan-400 border border-slate-800 light:border-slate-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 light:bg-slate-200 hover:text-cyan-400 border border-slate-800 light:border-slate-300 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 light:text-slate-600">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Himanshu Kumar. Designed with React, TypeScript & Enterprise Best Practices.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 light:bg-white light:hover:bg-slate-100 light:text-slate-600 light:hover:text-cyan-600 light:border-slate-300 transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
