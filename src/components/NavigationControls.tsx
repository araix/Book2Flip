import React from 'react';

interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoHome: () => void;
  onToggleContents: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onGoHome,
  onToggleContents,
  onToggleFullscreen,
  isFullscreen,
  canGoBack,
  canGoForward
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="bg-amber-800/90 backdrop-blur-sm text-amber-50 rounded-full px-4 py-2 shadow-lg flex items-center space-x-3">
        {/* Home button */}
        <button 
          onClick={onGoHome}
          className="p-2 hover:bg-amber-700/50 rounded-full transition-colors"
          aria-label="Go to cover"
          title="Go to cover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        
        {/* Previous page button */}
        <button 
          onClick={onPrevPage}
          disabled={!canGoBack}
          className={`p-2 ${canGoBack ? 'hover:bg-amber-700/50' : 'opacity-50 cursor-not-allowed'} rounded-full transition-colors`}
          aria-label="Previous page"
          title="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Page indicator */}
        <div className="text-sm font-medium">
          {currentPage} / {totalPages}
        </div>
        
        {/* Next page button */}
        <button 
          onClick={onNextPage}
          disabled={!canGoForward}
          className={`p-2 ${canGoForward ? 'hover:bg-amber-700/50' : 'opacity-50 cursor-not-allowed'} rounded-full transition-colors`}
          aria-label="Next page"
          title="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Table of contents button */}
        <button 
          onClick={onToggleContents}
          className="p-2 hover:bg-amber-700/50 rounded-full transition-colors"
          aria-label="Table of contents"
          title="Table of contents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Fullscreen button */}
        <button 
          onClick={onToggleFullscreen}
          className="p-2 hover:bg-amber-700/50 rounded-full transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3zm7-1a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
