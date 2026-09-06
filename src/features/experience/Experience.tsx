import React from 'react';
import {
  Calendar,
  MapPin,
  Award,
  ChevronRight,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { experienceData } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WORK EXPERIENCE"
          title="Proven Leadership in Mission-Critical Engineering"
          subtitle="4+ years of hands-on software development, SME mentorship, and continuous delivery excellence at Cognizant."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((role, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Connector Line */}
              <div className="hidden sm:block absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-slate-800 to-transparent light:via-slate-300" />

              <Card className="border-cyan-500/30 sm:ml-12 relative p-6 sm:p-8 text-left">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 light:border-slate-200 pb-5 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900">
                        {role.title}
                      </h3>
                      <Badge variant="cyan" size="sm">
                        SME Leadership
                      </Badge>
                    </div>
                    <div className="text-base font-semibold text-cyan-400 light:text-cyan-600 flex items-center gap-2">
                      <span>{role.company}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 light:text-slate-600 text-xs font-normal">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-400 light:text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-300 light:text-slate-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                      {role.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 light:text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {role.location}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {role.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 text-center"
                    >
                      <div className="text-base sm:text-lg font-bold text-cyan-400 light:text-cyan-600 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-400 light:text-slate-600 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detailed Highlights */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-semibold">
                    Core Engineering Responsibilities & Impact
                  </h4>
                  <ul className="space-y-3">
                    {role.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-3 text-sm text-slate-300 light:text-slate-700 leading-relaxed"
                      >
                        <ChevronRight className="w-4 h-4 text-cyan-400 light:text-cyan-600 flex-shrink-0 mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SME Accolade Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900/40 to-cyan-500/10 border border-amber-500/30 light:via-white light:border-amber-300 mb-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 light:text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-400 light:text-amber-700 uppercase font-mono tracking-wide">
                        Consecutive 5/5 Manager Rating Recognition
                      </div>
                      <div className="text-xs text-slate-300 light:text-slate-700 mt-0.5">
                        Consistently earned the highest possible manager evaluation for 3 consecutive years for technical leadership, proactive production problem-solving, and cross-team knowledge sharing.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies used */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies Applied in Production
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {role.technologies.map((tech) => (
                      <Badge key={tech} variant="slate" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
