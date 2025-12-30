
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
 * Standard React Error Boundary.
 * Uses explicit React.Component to ensure compatibility across different environment configurations.
 */
class ErrorBoundary extends React.Component<Props, State> {
  // Initialize state directly as a class property
  public state: State = {
    hasError: false,
    error: null,
  };

  // Static method to update state when an error occurs
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Lifecycle method to catch and log errors
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // Fix: Correct context for this.setState using arrow function property
  private handleRetry = () => {
    // Property 'setState' exists on React.Component
    this.setState({
      hasError: false,
      error: null
    });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    // Fix: Access props from this context
    const { children } = this.props;

    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black text-green-500 font-mono">
          <div className="border border-red-500/50 p-8 max-w-xl w-full bg-red-950/10">
            <h2 className="text-xl font-black mb-4 uppercase tracking-widest text-red-500">
              [CRITICAL_FAILURE]
            </h2>
            <p className="text-sm mb-6 opacity-80 leading-relaxed">
              System integrity compromised. An unhandled runtime exception has occurred. 
              The kernel has been halted to prevent data corruption.
            </p>
            <div className="bg-black/50 p-4 border border-red-900/30 text-[10px] text-red-900 mb-8 overflow-auto">
              LOG: {this.state.error?.message || 'NULL_POINTER_EXCEPTION'}
            </div>
            <button
              onClick={this.handleRetry}
              className="w-full py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all font-bold uppercase tracking-widest"
            >
              Initialize Reboot
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
