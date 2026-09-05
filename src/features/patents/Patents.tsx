import React from 'react';
import { CheckCircle2, FileCheck, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { patentsData } from '../../data/portfolioData';

export const Patents: React.FC = () => {
  return (
    <section id="patents" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="INTELLECTUAL PROPERTY & PATENTS"
          title="Published & Granted Patents"
          subtitle="Showcasing novel hardware-software architectures and intelligent sensor systems authored and patented by Himanshu."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {patentsData.map((patent) => (
            <Card
              key={patent.id}
              className="text-left p-6 sm:p-8 border-purple-500/30 hover:border-purple-500/60 relative overflow-hidden flex flex-col justify-between group"
              glowOnHover
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

              <div className="space-y-4 relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="purple" size="sm" className="font-mono">
                    {patent.status}
                  </Badge>
                  <span className="text-xs font-mono text-purple-400 light:text-purple-700 font-bold bg-purple-500/10 light:bg-purple-50 px-2.5 py-1 rounded-md border border-purple-500/30 light:border-purple-200">
                    {patent.patentNumber}
                  </span>
                </div>

                {/* Title & Domain */}
                <div>
                  <h3 className="text-xl font-extrabold text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                    {patent.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 light:text-slate-600 mt-1">
                    Domain: {patent.domain}
                  </p>
                </div>

                {/* Abstract Summary */}
                <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {patent.summary}
                </p>

                {/* Key Innovations */}
                <div className="pt-3 border-t border-slate-800 light:border-slate-200 space-y-2">
                  <div className="text-xs font-mono text-purple-400 light:text-purple-700 font-semibold uppercase tracking-wider">
                    Key Patented Innovations
                  </div>
                  <ul className="space-y-1.5">
                    {patent.keyInnovations.map((innovation, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 light:text-slate-600 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 light:text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{innovation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-400 light:text-slate-600">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-purple-400 light:text-purple-600" />
                  Official IP Filing
                </span>
                <a
                  href={patent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 light:text-purple-700 font-semibold hover:underline inline-flex items-center gap-1 group/link"
                >
                  <span>Verify on IP India</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
