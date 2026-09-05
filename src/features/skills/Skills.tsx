import React, { useState } from 'react';
import {
  Server,
  Cloud,
  Layout,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { skillCategories } from '../../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-teal-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Expert':
        return <Badge variant="emerald" size="sm">Expert</Badge>;
      case 'Advanced':
        return <Badge variant="cyan" size="sm">Advanced</Badge>;
      default:
        return <Badge variant="slate" size="sm">Proficient</Badge>;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="TECHNICAL MASTERY"
          title="Full-Stack & Enterprise Core Competencies"
          subtitle="Comprehensive proficiency across high-performance Java microservices, cloud-native DevOps, reactive streaming, and modern web interfaces."
        />

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 light:bg-white text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300 hover:border-slate-700'
              }`}
            >
              {getIcon(cat.iconName)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="max-w-5xl mx-auto text-left">
          <div className="mb-6 p-4 rounded-xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white light:text-slate-900 flex items-center gap-2">
                {getIcon(skillCategories[activeTab].iconName)}
                <span>{skillCategories[activeTab].title}</span>
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                {skillCategories[activeTab].description}
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400">
              {skillCategories[activeTab].skills.length} Core Technologies
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories[activeTab].skills.map((skill, sIdx) => (
              <Card
                key={sIdx}
                className="p-4 border-slate-800 hover:border-cyan-500/40 text-left transition-all"
                hoverEffect
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-slate-100 light:text-slate-900">
                    {skill.name}
                  </span>
                  {getLevelBadge(skill.level)}
                </div>

                {skill.tags && (
                  <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-800/60 light:border-slate-200">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800/80 light:border-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Global Competency Highlights */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
            <div className="text-cyan-400 light:text-cyan-700 font-bold mb-1">Architecture & Design</div>
            <p className="text-slate-400 light:text-slate-600">
              Microservices decomposition, Domain-Driven Design, Resilience4j circuit breakers, WebClient reactive paradigms.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
            <div className="text-emerald-400 light:text-emerald-700 font-bold mb-1">Event-Driven Architecture</div>
            <p className="text-slate-400 light:text-slate-600">
              Kafka header-based routing, partition tuning, dead-letter-queue (DLQ) automated failovers, zero consumer lag.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
            <div className="text-amber-400 light:text-amber-700 font-bold mb-1">Testing & Governance</div>
            <p className="text-slate-400 light:text-slate-600">
              JUnit 5, Mockito, Jtest rule compliance, Postman/Newman automated API pipelines, SonarQube quality gates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
