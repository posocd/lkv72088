'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

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
 * Uses property initializer for state and direct Component inheritance to resolve type errors 
 * where inherited members like state, props, and setState were not being recognized.
 */
// Fix: Use direct Component import and inheritance to ensure type safety for state/props
class ErrorBoundary extends Component<Props, State> {
  // Fix: Use property initializer for state for better compatibility and type inference
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

  // Fix: Arrow function preserves 'this' context, and setState is now recognized via inheritance
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
    // Fix: Access props from inherited Component member
    const { children } = this.props;

    // Fix: Access state from inherited Component member
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
              {/* Fix: safely access error from state */}
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
