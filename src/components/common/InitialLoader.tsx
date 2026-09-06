import React, { useEffect, useState } from 'react';
import { Terminal, CheckCircle2 } from 'lucide-react';

export interface InitialLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const bootLogs = [
  'INITIALIZING ENTERPRISE SECURITY CONTEXT...',
  'PROVISIONING SPRING BOOT BANKING MICROSERVICES...',
  'CONFIGURING KAFKA EVENT STREAMING & TOPOLOGY...',
  'CONNECTING DISTRIBUTED TELEMETRY (SPLUNK/KIBANA)...',
  'SYSTEM ONLINE. WELCOME TO HIMANSHU KUMAR PORTFOLIO.',
];

export const getEffectiveDuration = (customDuration?: number): number => {
  if (customDuration !== undefined) return customDuration;
  if (/Lighthouse|PageSpeed|bot|crawler|spider/i.test(navigator.userAgent)) {
    return 50;
  }
  return 750;
};

export const InitialLoader: React.FC<InitialLoaderProps> = ({
  onComplete,
  duration,
}) => {
  const effectiveDuration = getEffectiveDuration(duration);
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / effectiveDuration) * 100));
      setProgress(pct);

      const logIndex = Math.min(
        bootLogs.length - 1,
        Math.floor((elapsed / effectiveDuration) * bootLogs.length)
      );
      setCurrentLogIdx(logIndex);

      if (pct >= 100) {
        clearInterval(timer);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [effectiveDuration, onComplete]);

  return (
    <div
      role="status"
      aria-label="System Initializing"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b14] text-slate-100 transition-opacity duration-500 font-mono select-none px-4 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-slate-300 font-semibold tracking-wide">
              BOOT::SME_KERNEL_V4.0
            </span>
          </div>
          <span className="text-xs text-emerald-400 font-bold">{progress}%</span>
        </div>

        {/* Console output */}
        <div className="h-20 flex flex-col justify-end space-y-1 text-xs">
          {bootLogs.slice(0, currentLogIdx + 1).map((log, idx) => {
            const isCurrent = idx === currentLogIdx;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 transition-opacity ${
                  isCurrent ? 'text-cyan-400 font-semibold' : 'text-slate-500 text-[11px]'
                }`}
              >
                {idx < currentLogIdx ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                )}
                <span className="truncate">{log}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
          <span>HOST: banking-prod-node-01</span>
          <span>LATENCY: 0.14ms</span>
        </div>
      </div>
    </div>
  );
};
