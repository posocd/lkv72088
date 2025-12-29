'use client';

import React, { useMemo, useState } from 'react';

export const TerminalLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[40vh] w-full" aria-busy="true">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-yellow-400/10 rounded-full" />
      <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

/**
 * Clean, standard image loader without terminal-style typing effects.
 */
export const HackerImage: React.FC<{ 
  src: string; 
  alt: string; 
  className?: string; 
  aspectRatio?: string; 
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
}> = ({ 
  src, alt, className = '', aspectRatio = '16/9', priority = false, objectFit = 'cover' 
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  const containerStyle = useMemo(() => {
    return aspectRatio === 'auto' ? {} : { aspectRatio };
  }, [aspectRatio]);

  return (
    <div 
      className={`relative overflow-hidden bg-gray-950 ${className}`} 
      style={containerStyle}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-950">
          <div className="w-8 h-8 border-2 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-red-500 font-mono text-xs">SIGNAL_LOST</div>
      ) : (
        <img
          src={src}
          alt={alt}
          width="1200"
          height="1200"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-${objectFit} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};