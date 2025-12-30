
'use client';

import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  t?: (key: string) => string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Standard React Error Boundary for Next.js 15.5.
 * Uses strict typing for Component lifecycle.
 */
// Fix: Use React.Component explicitly to ensure that the class correctly inherits setState and props from React.
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('System Breach Detected:', error, errorInfo);
  }

  // Fix: handleRetry uses this.setState which is inherited from React.Component
  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null
    });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    // Fix: this.props is inherited from React.Component
    const { children } = this.props;

    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black text-green-500 font-mono">
          <div className="border-2 border-red-500 p-8 max-w-xl w-full bg-red-950/10 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-[0.3em] text-red-500 animate-pulse">
              [SYSTEM_CRITICAL_BREACH]
            </h2>
            <p className="text-sm mb-6 opacity-80 leading-relaxed font-bold">
              Kernel panic. Process isolation failed. Local environment corrupted.
              Initialize hardware reset to restore system integrity.
            </p>
            <div className="bg-black/80 p-4 border border-red-900/50 text-[11px] text-red-400 mb-8 overflow-auto font-mono max-h-32">
              ERROR_LOG_V5.5: {this.state.error?.message || 'UNKNOWN_KERNEL_EXCEPTION'}
            </div>
            <button
              onClick={this.handleRetry}
              className="w-full py-4 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              RUN: SYSTEM_REBOOT.EXE
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
