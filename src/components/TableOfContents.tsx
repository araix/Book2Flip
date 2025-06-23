import React from 'react';
import { Chapter } from '../types/book';

interface TableOfContentsProps {
  chapters: Chapter[];
  currentPage: number;
  onChapterSelect: (pageNumber: number) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  chapters,
  currentPage,
  onChapterSelect,
  onClose,
  isVisible
}) => {
  return (
    <div 
      className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center
        transition-opacity duration-300
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-amber-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-medium text-amber-900">Table of Contents</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-amber-100 rounded-full transition-colors"
            aria-label="Close table of contents"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => onChapterSelect(0)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  currentPage === 0 
                    ? 'bg-amber-200 text-amber-900 font-medium' 
                    : 'hover:bg-amber-100 text-amber-800'
                }`}
              >
                Cover
              </button>
            </li>
            
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  onClick={() => onChapterSelect(chapter.pageStart)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage >= chapter.pageStart && currentPage <= (chapter.pageEnd || chapter.pageStart)
                      ? 'bg-amber-200 text-amber-900 font-medium' 
                      : 'hover:bg-amber-100 text-amber-800'
                  }`}
                >
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
