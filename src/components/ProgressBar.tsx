import React from 'react';

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentPage, totalPages }) => {
  const progress = (currentPage / totalPages) * 100;
  
  return (
    <div className="fixed bottom-0 left-0 w-full h-1 bg-amber-200 z-10">
      <div 
        className="h-full bg-amber-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
