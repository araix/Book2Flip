import React from 'react';
import { PurchaseInfo } from '../types/book';

interface PurchaseModalProps {
  purchaseInfo: PurchaseInfo;
  bookTitle: string;
  onClose: () => void;
  isVisible: boolean;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  purchaseInfo,
  bookTitle,
  onClose,
  isVisible
}) => {
  return (
    <div 
      className={`
        fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center
        transition-opacity duration-300
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Enjoying {bookTitle}?</h2>
          
          <p className="text-amber-800 mb-4">{purchaseInfo.text}</p>
          
          {purchaseInfo.price && (
            <p className="text-lg font-medium text-amber-900 mb-6">
              {purchaseInfo.price}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={purchaseInfo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
            >
              Get the Full Book
            </a>
            
            <button
              onClick={onClose}
              className="flex-1 bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Continue Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
