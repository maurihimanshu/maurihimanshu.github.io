import React from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Cpu,
  CheckCircle,
  Building2,
  Award,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { personalInfo } from '../../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: "Secure Banking Microservices",
      desc: "Architecting zero-downtime, customer-focused digital banking workflows including account opening, KYC identity checks, and banking API integrations adhering to OWASP and compliance standards.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Kafka Event Streaming & Optimization",
      desc: "Deep expertise in tuning Kafka event architectures with header-based filtering, application-aware routing, and tuned listener lifecycles that eradicate consumer lag and message dropouts.",
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      title: "Team SME & Cross-Functional Mentorship",
      desc: "Serving as primary technical SME across 20+ engineering squads, conducting architectural reviews, Knowledge Transfer (KT) bootcamps, and establishing clean code and testing baselines.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Enterprise SDKs & Shared Libraries",
      desc: "Engineering foundational WebClient adapters, validation fallback modules, and reusable Spring Boot starter SDKs, reducing feature development cycles by over 35%.",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ABOUT ME"
          title="Engineering Resilient Platforms with Proven SME Ownership"
          subtitle="A 4+ year track record of delivering mission-critical digital banking capabilities, driving platform reliability, and championing engineering excellence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left: Detailed narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4 text-base text-slate-300 light:text-slate-700 leading-relaxed">
              <p>
                I am a <strong>Software Engineer and Team Subject Matter Expert (SME)</strong> with over 4 years of experience architecting, developing, and operating mission-critical digital banking solutions at <strong>Cognizant Technology Solutions</strong>.
              </p>
              <p>
                My engineering focus spans the entire Agile software lifecycle—from initial architectural blueprinting and Spring Boot microservice implementation to reactive WebClient integrations, Kafka event streaming pipelines, and containerized Kubernetes deployments.
              </p>
              <p>
                As a designated Team SME, I don’t just write code; I mentor developers, establish automated CI/CD quality gates (&gt;80% code coverage on SonarQube), lead root-cause analysis (RCA) on production incidents using Splunk and Kibana, and formulate reusable platform SDKs consumed by <strong>20+ product squads</strong>.
              </p>
            </div>

            {/* Manager rating highlight callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-slate-900/60 to-emerald-500/10 border border-cyan-500/30 light:via-white light:border-cyan-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 light:text-cyan-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-white light:text-slate-900 text-sm sm:text-base">
                    5/5 Manager Rating (3 Consecutive Years)
                  </div>
                  <div className="text-xs text-slate-400 light:text-slate-600">
                    Recognized consistently for SME ownership, secure banking contributions, and delivery excellence.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick credentials checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-slate-300 light:text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>AWS Certified Developer – Associate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>AWS Certified Cloud Practitioner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Microsoft Azure Fundamentals Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>GitHub Copilot Certified Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>2 Granted Patents in Autonomous Tech</span>
              </div>
            </div>
          </div>

          {/* Right: Experience summary card */}
          <div className="lg:col-span-5">
            <Card className="border-cyan-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 light:text-cyan-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white light:text-slate-900 text-base">
                      Current Engagement
                    </h4>
                    <p className="text-xs text-slate-400 light:text-slate-600">Cognizant Technology Solutions</p>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">
                  Active Role
                </Badge>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <div className="text-xs font-mono text-cyan-400 light:text-cyan-600">Designation</div>
                  <div className="text-sm font-semibold text-slate-200 light:text-slate-800">
                    Associate / Software Engineer / Team SME
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-400 light:text-cyan-600">Tenure</div>
                  <div className="text-sm text-slate-300 light:text-slate-700">
                    July 2022 – Present (4+ Years Total Experience)
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-400 light:text-cyan-600">Domain Focus</div>
                  <div className="text-sm text-slate-300 light:text-slate-700">
                    Digital Banking, Account Opening & KYC, Workflow Orchestration
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-400 light:text-cyan-600">Key Specialization</div>
                  <div className="text-sm text-slate-300 light:text-slate-700">
                    Java Spring Boot, Apache Kafka, WebClient, Microservices, SRE & Observability
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 light:border-slate-200">
                  <div className="text-xs font-mono text-slate-500 mb-2">Location & Status</div>
                  <div className="flex items-center justify-between text-xs text-slate-300 light:text-slate-700">
                    <span>{personalInfo.location}</span>
                    <span className="text-emerald-400 font-mono font-medium">Ready for Transformation</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <Card key={idx} className="text-left space-y-3" hoverEffect borderAccent="default">
              <div className="p-3 rounded-xl bg-slate-800/80 light:bg-slate-100 w-fit">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-base text-white light:text-slate-900">{pillar.title}</h3>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
