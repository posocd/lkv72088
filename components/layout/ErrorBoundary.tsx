import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLanguage } from '../../utils/LanguageContext';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface BoundaryProps extends Props {
  t: (key: string) => string;
}

/**
 * Standard React Error Boundary.
 */
// Use Component directly to ensure proper inheritance of setState and props in TypeScript
class ErrorBoundary extends Component<BoundaryProps, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: BoundaryProps) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // Use arrow function for property to preserve 'this' context and access inherited setState
  private handleRetry = () => {
    // Accessing setState from the Component base class to clear error state
    this.setState({
      hasError: false,
      error: null
    });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    // Accessing props inherited from Component for localized strings
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="bg-gray-900/30 border border-red-900/50 rounded-xl p-8 md:p-12 shadow-2xl shadow-red-900/10 w-full max-w-2xl text-center animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-black text-red-600 mb-6 tracking-tighter uppercase font-mono break-words">
              {t('errorTitle')}
            </h2>
            
            <div className="space-y-4 mb-10">
              <p className="text-sm sm:text-base text-gray-400 font-mono leading-relaxed">
                {t('errorDesc')}
              </p>
              
              <div className="py-3 px-4 bg-black/40 border border-red-900/20 rounded font-mono text-[10px] sm:text-xs text-red-900 uppercase break-all">
                LOG: {this.state.error?.message || 'FAILED TO FETCH DYNAMICALLY IMPORTED MODULE'}
              </div>
            </div>

            <button
              onClick={this.handleRetry}
              className="w-full sm:w-auto min-w-[280px] py-6 border border-red-900/60 bg-transparent text-red-500 hover:bg-red-500/5 hover:border-red-500 transition-all duration-500 font-mono group"
            >
              <span className="flex flex-col items-center justify-center gap-1">
                <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase">
                  {t('errorButton').replace(/[\[\]]/g, '').trim()}
                </span>
              </span>
            </button>
          </div>
        </div>
      );
    }

    // Accessing children inherited from Component props to render the underlying tree
    return this.props.children;
  }
}

const ErrorBoundaryWrapper: React.FC<Props> = ({ children }) => {
  const { t } = useLanguage();
  return <ErrorBoundary t={t}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
