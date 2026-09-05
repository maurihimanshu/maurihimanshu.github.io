import React, { useState } from 'react';
import {
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { projectsData } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Banking Platform', 'Event Streaming', 'Enterprise SDK'];

  const filteredProjects =
    filterCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="PRODUCTION PROJECTS & CASE STUDIES"
          title="High-Impact Enterprise Banking Systems"
          subtitle="Architectural deep-dives into mission-critical platforms, event streaming optimizations, and reusable libraries developed for enterprise scale."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col justify-between text-left p-6 sm:p-7 border-slate-800 light:border-slate-200 hover:border-cyan-500/50 group"
              glowOnHover
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm" className="font-mono">
                    {project.category}
                  </Badge>
                  {project.metrics && project.metrics[0] && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {project.metrics[0].value}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 light:text-slate-500 mt-1 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 light:text-slate-600 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Architecture Highlights bullet */}
                <div className="space-y-2 pt-2 border-t border-slate-800 light:border-slate-200">
                  <div className="text-xs font-mono text-slate-400 light:text-slate-600 font-semibold">
                    Architecture Highlights:
                  </div>
                  <ul className="space-y-1.5">
                    {project.architectureHighlights.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-400 light:text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="slate" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge variant="slate" size="sm">
                      +{project.technologies.length - 5}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 light:border-slate-200">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between group-hover:border-cyan-500/50"
                  onClick={() => setSelectedProject(project)}
                  icon={<ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                >
                  Architecture Deep Dive
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Modal Deep Dive */}
        {selectedProject && (
          <Modal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            title={selectedProject.title}
            subtitle={selectedProject.subtitle}
            maxWidth="4xl"
          >
            <div className="space-y-6 text-left">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 mb-2 font-semibold">
                  Executive Overview
                </h4>
                <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Metrics Grid if available */}
              {selectedProject.metrics && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 mb-3 font-semibold">
                    Key Performance Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200"
                      >
                        <div className="text-lg font-bold text-cyan-400 light:text-cyan-600 font-mono">{m.value}</div>
                        <div className="text-xs text-slate-400 light:text-slate-600">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Blueprint Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-600 mb-3 font-semibold">
                  Architectural Blueprint & Design Decisions
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.architectureHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 light:bg-cyan-100 text-cyan-400 light:text-cyan-700 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Outcomes */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 light:text-emerald-600 mb-3 font-semibold">
                  Production Impact & Business Outcomes
                </h4>
                <ul className="space-y-2">
                  {selectedProject.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 light:text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-400 light:text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 mb-2 font-semibold">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <Badge key={t} variant="cyan" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};
