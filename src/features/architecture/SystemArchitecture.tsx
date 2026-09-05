import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface NodeDetail {
  id: string;
  name: string;
  type: string;
  tech: string;
  role: string;
  smeInsight: string;
}

const nodes: NodeDetail[] = [
  {
    id: 'gateway',
    name: 'API Gateway & WebClient',
    type: 'Ingress & Reactive Layer',
    tech: 'Spring Cloud Gateway / Spring WebClient',
    role: 'SSL termination, token verification, non-blocking HTTP dispatch to internal microservices.',
    smeInsight:
      'Engineered shared WebClient patterns with circuit breakers (Resilience4j) & retry fallbacks, safeguarding upstream banking APIs against timeout cascades.',
  },
  {
    id: 'orchestrator',
    name: 'Account & KYC Microservices',
    type: 'Core Business Domain',
    tech: 'Java 17 / Spring Boot 3 / Kubernetes',
    role: 'Performs customer eligibility scoring, validation frameworks, and multi-tenant workflow orchestration.',
    smeInsight:
      'Standardized reusable validation engines and modular SDKs adopted by 20+ teams, enforcing strict zero-tolerance data integrity rules.',
  },
  {
    id: 'kafka',
    name: 'Kafka Event Streaming Broker',
    type: 'High-Throughput Backbone',
    tech: 'Apache Kafka / Partition Clustering',
    role: 'Asynchronous event dissemination, transaction journals, state change event topics.',
    smeInsight:
      'Tuned Kafka with header-based filtering & application-aware routing, preventing unnecessary payload deserialization and eliminating consumer lag spikes.',
  },
  {
    id: 'persistence',
    name: 'Persistence & Polyglot DBs',
    type: 'Storage & ACID State',
    tech: 'Oracle SQL / MongoDB / JPA Hibernate',
    role: 'Transactional balance persistence, customer documents, and read-optimized projections.',
    smeInsight:
      'Optimized indexing, query execution plans, and transaction boundaries to maintain sub-second response times under peak concurrent loads.',
  },
  {
    id: 'observability',
    name: 'Observability & SRE Telemetry',
    type: 'APM & Audit Engine',
    tech: 'Splunk / Kibana / Rancher / SonarQube',
    role: 'Distributed trace correlation IDs, real-time error alerts, and compliance audit logs.',
    smeInsight:
      'Spearheaded incident root-cause analysis (RCA) dashboards and instituted 80%+ code coverage quality gates across all delivery pipelines.',
  },
];

export const SystemArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(nodes[2]); // Default to Kafka
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [activeStep, setActiveStep] = useState<number>(-1);

  const runSimulation = () => {
    setSimulationState('running');
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setSimulationState('completed');
          return 4;
        }
        return prev + 1;
      });
    }, 900);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setActiveStep(-1);
  };

  return (
    <section id="architecture" className="py-24 relative bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="SME SYSTEM ARCHITECTURE"
          title="Digital Banking & High-Throughput Event Streaming"
          subtitle="Explore the interactive architecture blueprint and Kafka event processing patterns engineered to support mission-critical enterprise banking platforms."
        />

        {/* Visual Architecture Topology Grid */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Interactive Banking Event Flow Topology
              </span>
              <Badge variant="cyan" size="sm">
                Live Interactive
              </Badge>
            </div>

            {/* Simulation controls */}
            <div className="flex items-center gap-2">
              {simulationState === 'idle' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={runSimulation}
                  icon={<Play className="w-3.5 h-3.5" />}
                >
                  Simulate Account Opening Event
                </Button>
              )}
              {simulationState === 'running' && (
                <Button variant="emerald" size="sm" isLoading disabled>
                  Processing Event Stream...
                </Button>
              )}
              {simulationState === 'completed' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 200 OK — Processed in 14ms
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSimulation}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Node Connection Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {nodes.map((node, index) => {
              const isSelected = selectedNode.id === node.id;
              const isSimulatingActive = activeStep === index;
              const isSimulatingDone = activeStep > index;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`cursor-pointer rounded-xl p-4 text-left border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-cyan-950/40 light:bg-cyan-50 border-cyan-500 light:border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/70 light:bg-white border-slate-800 light:border-slate-300 hover:border-slate-700'
                  } ${
                    isSimulatingActive
                      ? 'ring-2 ring-emerald-400 bg-emerald-950/40 light:bg-emerald-50 border-emerald-400 scale-[1.03]'
                      : ''
                  }`}
                >
                  {/* Step indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Stage 0{index + 1}
                    </span>
                    {isSimulatingDone && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {isSimulatingActive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white light:text-slate-900 mb-1 line-clamp-1">
                    {node.name}
                  </h4>
                  <p className="text-[11px] text-cyan-400 light:text-cyan-600 font-mono mb-2 truncate">
                    {node.tech}
                  </p>
                  <p className="text-[11px] text-slate-400 light:text-slate-600 line-clamp-2">
                    {node.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Deep Dive Detail Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 text-left">
            <Card className="border-cyan-500/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 light:border-slate-200 pb-4">
                <div>
                  <div className="text-xs font-mono text-slate-400">{selectedNode.type}</div>
                  <h3 className="text-xl font-bold text-white light:text-slate-900 mt-0.5">
                    {selectedNode.name}
                  </h3>
                </div>
                <Badge variant="cyan" size="md" className="font-mono">
                  {selectedNode.tech}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Architecture Role & Responsibilities
                  </h5>
                  <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                    {selectedNode.role}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Himanshu's SME Contribution & Optimization
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                        {selectedNode.smeInsight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Architectural Highlights Checklist */}
          <div className="lg:col-span-4 text-left">
            <Card className="border-slate-800 light:border-slate-200 p-6 space-y-4">
              <h4 className="font-bold text-white light:text-slate-900 text-sm font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
                <span>Enterprise Banking Safeguards</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-300 light:text-slate-700">
                <div className="p-2.5 rounded-lg bg-slate-950/50 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                  <div className="font-semibold text-cyan-400 light:text-cyan-700 font-mono">Header-Based Routing</div>
                  <div className="text-slate-400 light:text-slate-600 mt-0.5">
                    Kafka consumer skips deserializing irrelevant topic payloads, saving up to 40% CPU overhead.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                  <div className="font-semibold text-emerald-400 light:text-emerald-700 font-mono">Resilience4j Circuit Breakers</div>
                  <div className="text-slate-400 light:text-slate-600 mt-0.5">
                    Non-blocking WebClient gracefully falls back to cached responses or queue buffers on gateway lag.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                  <div className="font-semibold text-amber-400 light:text-amber-700 font-mono">Automated DLQ Replay</div>
                  <div className="text-slate-400 light:text-slate-600 mt-0.5">
                    Transient network failures route to Dead Letter Queue with exponential retry before alert dispatch.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
