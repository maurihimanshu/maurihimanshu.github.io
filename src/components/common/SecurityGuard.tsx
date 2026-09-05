import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ShieldAlert, LogOut, ArrowRight, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface SecurityGuardProps {
  enableContextMenuBlock?: boolean;
  enableDevToolsBlock?: boolean;
  enableExitIntent?: boolean;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({
  enableContextMenuBlock = true,
  enableDevToolsBlock = true,
  enableExitIntent = true,
}) => {
  const [securityToast, setSecurityToast] = useState<string | null>(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);
  const hasEngagedPageRef = useRef(false);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!securityToast) return;
    const timer = setTimeout(() => {
      setSecurityToast(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [securityToast]);

  const showToast = useCallback((message: string) => {
    setSecurityToast(message);
  }, []);

  useEffect(() => {
    // 1. Right Click Blocking with Portfolio-Specific Notice
    const handleContextMenu = (e: MouseEvent) => {
      if (enableContextMenuBlock) {
        e.preventDefault();
        showToast('Right-click context menu is restricted on this portfolio.');
      }
    };

    // 2. DevTools Keyboard Shortcut Blocking
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableDevToolsBlock) return;

      const keyUpper = e.key.toUpperCase();
      const isF12 = e.key === 'F12';
      const isModifier = e.ctrlKey || e.metaKey;
      const isInspect = isModifier && e.shiftKey && ['I', 'J', 'C'].includes(keyUpper);
      const isViewSource = isModifier && keyUpper === 'U';

      if (isF12 || isInspect || isViewSource) {
        e.preventDefault();
        showToast('Source inspection and developer console shortcuts are restricted.');
      }
    };

    // 3. Track when the user is actively viewing/browsing inside the page
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > 50) {
        hasEngagedPageRef.current = true;
      }
    };

    // 4. Custom Exit Intent Popup when user moves cursor towards tab close after viewing page
    const handleMouseLeave = (e: MouseEvent) => {
      if (!enableExitIntent || hasShownExitModal || !hasEngagedPageRef.current) return;
      if (e.clientY <= 15) {
        setIsExitModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableContextMenuBlock, enableDevToolsBlock, enableExitIntent, hasShownExitModal, showToast]);

  return (
    <>
      {/* Security Toast Notification */}
      {securityToast && (
        <div
          role="alert"
          data-testid="security-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900/95 light:bg-white/95 text-slate-100 light:text-slate-900 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md animate-fadeIn transition-all duration-300 max-w-md"
        >
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm font-medium leading-snug">
            {securityToast}
          </div>
          <button
            onClick={() => setSecurityToast(null)}
            className="text-slate-400 hover:text-slate-200 light:hover:text-slate-700 text-xs px-2 py-1 rounded"
            aria-label="Dismiss security notice"
          >
            ✕
          </button>
        </div>
      )}

      {/* Custom Exit Intent Popup Modal */}
      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        title="Leaving So Soon?"
        subtitle="Before you close this session, connect with Himanshu Kumar."
        maxWidth="lg"
      >
        <div data-testid="exit-intent-modal" className="space-y-6 pt-2">
          <div className="p-4 rounded-xl bg-cyan-950/30 light:bg-cyan-50/70 border border-cyan-500/20 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-sm text-slate-300 light:text-slate-700">
              <p className="font-semibold text-slate-100 light:text-slate-900 mb-1">
                Engineering Highlights to Review:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 light:text-slate-600">
                <li>2 Granted Intellectual Property Patents</li>
                <li>Interactive Banking & Kafka Microservices Simulator</li>
                <li>Consistently rated 5/5 at Cognizant across 4+ years</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsExitModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Stay on Page
            </Button>
            <a
              href="mailto:maurihimanshu@gmail.com"
              className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg text-sm px-4 py-2 gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg text-sm px-4 py-2 gap-2 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 text-slate-300 bg-transparent dark:border-slate-700 dark:hover:border-cyan-400 light:border-slate-300 light:text-slate-700 light:hover:border-cyan-600 light:hover:text-cyan-600 w-full sm:w-auto"
            >
              LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
