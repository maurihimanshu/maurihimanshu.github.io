import React from 'react';
import {
  Award,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  certificationsData,
  educationData,
  achievementsData,
} from '../../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="CREDENTIALS & HONORS"
          title="Certifications, Education & Recognitions"
          subtitle="Industry-recognized cloud accreditations, formal computer science engineering background, and continuous excellence honors."
        />

        {/* Certifications 3-card row */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-6 text-left">
            Industry Cloud & AI Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <Card
                key={cert.name}
                className="text-left p-6 border-slate-800 light:border-slate-200 hover:border-cyan-500/40 flex flex-col justify-between"
                hoverEffect
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" size="sm" className="font-mono">
                      {cert.code}
                    </Badge>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-white light:text-slate-900 line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400 light:text-cyan-600 mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 light:border-slate-200">
                    <div className="text-[11px] font-mono text-slate-400 light:text-slate-600">Validated Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsVerified.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 light:text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-600 transition-colors flex items-center gap-1"
                    >
                      <span>Credentials</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Education & Achievements Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Education Card */}
          <div className="lg:col-span-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-600 font-bold mb-4">
              Formal Education
            </h3>
            <Card className="p-6 sm:p-7 border-slate-800 light:border-slate-200 h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white light:text-slate-900">
                    {educationData.degree}
                  </h4>
                  <p className="text-sm font-semibold text-cyan-400 light:text-cyan-600">
                    {educationData.field}
                  </p>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
                    {educationData.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 light:text-slate-600 py-3 border-y border-slate-800 light:border-slate-200 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                  {educationData.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {educationData.location}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
                {educationData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Honors & Recognitions */}
          <div className="lg:col-span-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-4">
              Honors & Career Recognitions
            </h3>
            <div className="space-y-3">
              {achievementsData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 light:bg-white border border-slate-800 light:border-slate-200 flex items-start gap-3.5 hover:border-amber-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-white light:text-slate-900">
                        {item.title}
                      </h4>
                      {item.metric && (
                        <span className="text-[10px] font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {item.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
