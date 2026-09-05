import React, { useEffect, useState, useCallback } from 'react';
import { ShieldAlert } from 'lucide-react';

export interface SecurityGuardProps {
  enableContextMenuBlock?: boolean;
  enableDevToolsBlock?: boolean;
  enableBeforeUnload?: boolean;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({
  enableContextMenuBlock = true,
  enableDevToolsBlock = true,
  enableBeforeUnload = true,
}) => {
  const [securityToast, setSecurityToast] = useState<string | null>(null);

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

    // 3. Tab Close / Reload Native Confirmation (beforeunload)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!enableBeforeUnload) return;
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enableContextMenuBlock, enableDevToolsBlock, enableBeforeUnload, showToast]);

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
    </>
  );
};
