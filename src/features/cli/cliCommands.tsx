import React from 'react';
import {
  personalInfo,
  skillCategories,
  experienceData,
  projectsData,
  patentsData,
  certificationsData,
} from '../../data/portfolioData';

export interface CommandContext {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  closeTerminal: () => void;
  clearBuffer: () => void;
}

export interface CommandLineEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  command?: string;
  content: React.ReactNode;
}

export const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'skills',
  'experience',
  'projects',
  'docs',
  'certs',
  'patents',
  'contact',
  'theme',
  'whoami',
  'date',
  'clear',
  'echo',
  'sudo',
  'exit',
] as const;

export type CommandName = (typeof AVAILABLE_COMMANDS)[number];

export function getCompletions(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [...AVAILABLE_COMMANDS];
  return AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(trimmed));
}

export function executeCommand(
  rawInput: string,
  ctx: CommandContext
): CommandLineEntry[] {
  const trimmed = rawInput.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  const entryId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  switch (command) {
    case 'help': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                AVAILABLE SYSTEM COMMANDS (Type command and press Enter)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
                <div><span className="text-cyan-300 font-bold">about</span> : Summary & Core Banking profile</div>
                <div><span className="text-cyan-300 font-bold">skills</span> : Technical competencies & frameworks</div>
                <div><span className="text-cyan-300 font-bold">experience</span> : Career history & Team SME impact</div>
                <div><span className="text-cyan-300 font-bold">projects</span> : Enterprise & personal software systems</div>
                <div><span className="text-cyan-300 font-bold">docs</span> : Open Technical Documentation & Specs</div>
                <div><span className="text-cyan-300 font-bold">certs</span> : Cloud certifications (AWS, Azure, Copilot)</div>
                <div><span className="text-cyan-300 font-bold">patents</span> : Granted intellectual property & patents</div>
                <div><span className="text-cyan-300 font-bold">contact</span> : Email, LinkedIn & GitHub profiles</div>
                <div><span className="text-cyan-300 font-bold">theme [dark|light|toggle]</span> : Switch active theme</div>
                <div><span className="text-cyan-300 font-bold">whoami</span> : Current terminal session identifier</div>
                <div><span className="text-cyan-300 font-bold">date</span> : System clock and UTC timestamp</div>
                <div><span className="text-cyan-300 font-bold">clear</span> : Clear terminal display buffer</div>
                <div><span className="text-cyan-300 font-bold">echo &lt;text&gt;</span> : Print input arguments to stdout</div>
                <div><span className="text-cyan-300 font-bold">exit</span> : Close Web CLI window</div>
              </div>
              <div className="text-slate-500 pt-1">
                Tip: Use <span className="text-slate-400">Tab</span> for autocomplete, and <span className="text-slate-400">↑/↓</span> for command history.
              </div>
            </div>
          ),
        },
      ];
    }

    case 'about':
    case 'bio': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="text-cyan-400 font-bold text-sm">
                {personalInfo.name} — {personalInfo.title}
              </div>
              <div className="text-emerald-400 font-medium">
                {personalInfo.headline}
              </div>
              <p className="leading-relaxed text-slate-300">
                {personalInfo.summary}
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                  Experience: <strong className="text-cyan-300">{personalInfo.yearsOfExperience}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                  Rating: <strong className="text-emerald-300">{personalInfo.managerRating}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                  Teams Impacted: <strong className="text-amber-300">{personalInfo.teamsImpacted}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                  Location: <strong className="text-slate-200">{personalInfo.location}</strong>
                </span>
              </div>
            </div>
          ),
        },
      ];
    }

    case 'skills': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-3 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                CORE TECHNICAL COMPETENCIES
              </div>
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-emerald-400 font-bold">
                    ▸ {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-3">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                      >
                        {skill.name} <span className="text-cyan-500/70">({skill.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case 'experience': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-3 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                CAREER TIMELINE & TEAM SME ROLES
              </div>
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-1 pl-2 border-l-2 border-cyan-500/40 ml-1">
                  <div className="text-white font-bold">
                    {exp.title} <span className="text-cyan-400">@ {exp.company}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {exp.period} | {exp.location} | {exp.type}
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px] pt-1">
                    {exp.highlights.slice(0, 3).map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case 'projects': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-3 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                ENTERPRISE & PERSONAL ARCHITECTURAL PROJECTS
              </div>
              {projectsData.map((proj, idx) => (
                <div key={idx} className="space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{proj.title}</span>
                    <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.docsId && (
                    <div className="pt-1 text-[11px]">
                      <a
                        href={`#docs?topic=${proj.docsId}`}
                        onClick={ctx.closeTerminal}
                        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                      >
                        [Open Documentation: {proj.docsId}]
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case 'docs': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="text-cyan-400 font-bold">
                ENTERPRISE DOCUMENTATION REPOSITORY
              </div>
              <p>Explore full architectural whitepapers, diagrams, and specifications:</p>
              <div className="space-y-1.5 pl-2 pt-1">
                <div>
                  <a
                    href="#docs?topic=expenso-android"
                    onClick={ctx.closeTerminal}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    ▸ Expenso: 100% Offline Android Finance Architecture
                  </a>
                </div>
                <div>
                  <a
                    href="#docs?topic=ai-work-assistant"
                    onClick={ctx.closeTerminal}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    ▸ AI Work Assistant: Local Machine Learning Intelligence
                  </a>
                </div>
                <div>
                  <a
                    href="#docs?topic=qr-file-transfer"
                    onClick={ctx.closeTerminal}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    ▸ Reliable Air-Gapped QR File Transfer Protocol
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="#docs"
                  onClick={ctx.closeTerminal}
                  className="inline-block px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                >
                  Launch Full Documentation Portal ➜
                </a>
              </div>
            </div>
          ),
        },
      ];
    }

    case 'certs':
    case 'certifications': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                INDUSTRY CREDENTIALS & CLOUD CERTIFICATIONS
              </div>
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-900">
                  <div>
                    <span className="text-white font-bold">{cert.name}</span>
                    <span className="text-slate-400 text-[11px] ml-2">({cert.issuer})</span>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline text-[11px]"
                    >
                      [Verify]
                    </a>
                  )}
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case 'patents': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                INTELLECTUAL PROPERTY & GRANTED PATENTS
              </div>
              {patentsData.map((pat, idx) => (
                <div key={idx} className="space-y-1 p-2 rounded bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold">{pat.title}</span>
                    <span className="text-[10px] text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      {pat.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {pat.patentNumber} | {pat.domain}
                  </div>
                  <p className="text-slate-300 text-[11px]">{pat.summary}</p>
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case 'contact': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                DIRECT COMMUNICATION CHANNELS
              </div>
              <div>Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-300 hover:underline">{personalInfo.email}</a></div>
              <div>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">{personalInfo.linkedin}</a></div>
              <div>GitHub: <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">{personalInfo.github}</a></div>
              <div>Location: <span className="text-slate-200">{personalInfo.location}</span></div>
              <div className="pt-2 text-emerald-400">Status: {personalInfo.availability}</div>
            </div>
          ),
        },
      ];
    }

    case 'theme': {
      const mode = args[0]?.toLowerCase();
      if (mode === 'dark' || mode === 'light') {
        ctx.setTheme(mode);
        return [
          {
            id: entryId,
            type: 'output',
            content: (
              <div className="text-xs font-mono text-cyan-300">
                Theme switched to <strong className="text-white uppercase">{mode}</strong> mode.
              </div>
            ),
          },
        ];
      }
      if (mode === 'toggle') {
        ctx.toggleTheme();
        const nextTheme = ctx.theme === 'dark' ? 'light' : 'dark';
        return [
          {
            id: entryId,
            type: 'output',
            content: (
              <div className="text-xs font-mono text-cyan-300">
                Theme toggled to <strong className="text-white uppercase">{nextTheme}</strong> mode.
              </div>
            ),
          },
        ];
      }
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>Current theme: <strong className="text-cyan-400 uppercase">{ctx.theme}</strong></div>
              <div className="text-slate-400">Usage: theme [dark | light | toggle]</div>
            </div>
          ),
        },
      ];
    }

    case 'whoami': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-slate-300">
              guest (Authenticated Portfolio Visitor — Read-Only Mode)
            </div>
          ),
        },
      ];
    }

    case 'date': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-slate-300">
              {new Date().toString()}
            </div>
          ),
        },
      ];
    }

    case 'echo': {
      return [
        {
          id: entryId,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-slate-300">
              {args.join(' ')}
            </div>
          ),
        },
      ];
    }

    case 'sudo': {
      return [
        {
          id: entryId,
          type: 'error',
          content: (
            <div className="text-xs font-mono text-amber-400">
              Permission denied: User &apos;guest&apos; is not in the sudoers file. This incident has been logged.
            </div>
          ),
        },
      ];
    }

    case 'clear':
    case 'cls': {
      ctx.clearBuffer();
      return [];
    }

    case 'exit':
    case 'quit': {
      ctx.closeTerminal();
      return [];
    }

    default: {
      return [
        {
          id: entryId,
          type: 'error',
          content: (
            <div className="text-xs font-mono text-amber-400">
              zsh: command not found: <span className="text-white font-bold">{command}</span>. Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> to inspect available commands.
            </div>
          ),
        },
      ];
    }
  }
}
