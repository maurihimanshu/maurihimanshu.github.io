import React from 'react';
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { personalInfo, metricsData } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-grid-pattern overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 radial-glow-cyan pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 radial-glow-emerald pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Overview */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 light:bg-slate-100 border border-slate-700/80 light:border-slate-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 light:text-slate-800">
                {personalInfo.availability}
              </span>
              <span className="text-slate-600 dark:text-slate-500">|</span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">Team SME</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.15]">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Secure, Scalable</span> Digital Banking Platforms
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 light:text-slate-700">
                {personalInfo.name} — <span className="text-cyan-400 light:text-cyan-600">{personalInfo.title}</span>
              </p>
            </div>

            {/* Narrative summary */}
            <p className="text-base sm:text-lg text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed">
              Software Engineer with <strong>4+ years of specialized experience</strong> in enterprise Java Spring Boot microservices,
              high-throughput <strong>Kafka event architectures</strong>, reactive WebClient patterns, and mission-critical digital banking flows.
              Recognized for technical SME leadership, reusable frameworks powering <strong>20+ teams</strong>, and <strong>3 consecutive years of 5/5 manager ratings</strong>.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  View Banking Projects
                </Button>
              </a>

              <a href="#architecture">
                <Button variant="secondary" size="lg" icon={<Layers className="w-4 h-4 text-cyan-400" />}>
                  Architecture Visualizer
                </Button>
              </a>

              <a href="#contact">
                <Button variant="outline" size="lg" icon={<Mail className="w-4 h-4" />}>
                  Contact Me
                </Button>
              </a>
            </div>

            {/* Tech chips strip */}
            <div className="pt-4 border-t border-slate-800/80 light:border-slate-200">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2.5">
                Core Production Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Core Java',
                  'Spring Boot',
                  'Kafka',
                  'Microservices',
                  'AWS',
                  'Kubernetes',
                  'Docker',
                  'React',
                  'TypeScript',
                  'Oracle SQL',
                  'Splunk',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/70 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300 hover:border-cyan-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SME Terminal & Metric Highlights */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Window Header */}
              <div className="px-4 py-3 bg-slate-950 light:bg-slate-100 border-b border-slate-800 light:border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">sme-platform-runtime.sh</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ONLINE (PROD)</span>
                </div>
              </div>

              {/* Terminal Code / Execution Flow */}
              <div className="p-5 font-mono text-xs space-y-4 text-slate-300 light:text-slate-800">
                <div className="space-y-1">
                  <div className="text-slate-500"># System Identity & Role Profile</div>
                  <div className="text-cyan-400">$ whoami</div>
                  <div className="text-slate-200 light:text-slate-800 pl-3">
                    &gt; Himanshu Kumar [Associate / Software Engineer / Team SME]
                  </div>
                  <div className="text-slate-200 light:text-slate-800 pl-3">
                    &gt; Organization: Cognizant Technology Solutions
                  </div>
                </div>

                <div className="space-y-1 border-t border-slate-800 light:border-slate-200 pt-3">
                  <div className="text-slate-500"># Core Microservices Cluster Health</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                      <div className="text-slate-400 light:text-slate-600">Account Opening</div>
                      <div className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> 99.99% UP
                      </div>
                    </div>
                    <div className="p-2 rounded bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                      <div className="text-slate-400 light:text-slate-600">Kafka Broker Cluster</div>
                      <div className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> ZERO LAG
                      </div>
                    </div>
                    <div className="p-2 rounded bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                      <div className="text-slate-400 light:text-slate-600">Code Coverage</div>
                      <div className="text-cyan-400 font-semibold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" /> &gt; 80% CI Gates
                      </div>
                    </div>
                    <div className="p-2 rounded bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                      <div className="text-slate-400 light:text-slate-600">Manager Rating</div>
                      <div className="text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                        <Award className="w-3 h-3" /> 5/5 (3 Yrs)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 border-t border-slate-800 light:border-slate-200 pt-3">
                  <div className="text-slate-500"># Intellectual Property & Innovation</div>
                  <div className="text-purple-400 light:text-purple-700">
                    &gt; Patent 202011012664: Fall Prevention Sensor System
                  </div>
                  <div className="text-purple-400 light:text-purple-700">
                    &gt; Patent 202111014541: Surveillance & Automated Alerting
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Location: {personalInfo.location}</span>
                  <a
                    href="#architecture"
                    className="text-cyan-400 light:text-cyan-600 hover:text-cyan-300 light:hover:text-cyan-700 hover:underline flex items-center gap-1"
                  >
                    Launch Architecture Sim &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Metric Cards Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {metricsData.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800/80 light:border-slate-200 backdrop-blur-sm hover:border-cyan-500/40 transition-all text-left group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 dark:from-white dark:to-slate-200 light:from-slate-900 light:via-slate-800 light:to-slate-700 group-hover:from-cyan-400 group-hover:to-teal-300 transition-all">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-300 light:text-slate-800 mt-1">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 light:text-slate-500 mt-0.5 truncate">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
