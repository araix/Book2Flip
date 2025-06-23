import React from 'react';

interface BookCoverProps {
  title: string;
  author: string;
  subtitle?: string;
  coverImage: string;
  onOpen: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  subtitle,
  coverImage,
  onOpen
}) => {
  return (
    <div 
      className="relative w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-xl overflow-hidden transform-gpu cursor-pointer hover:shadow-2xl transition-shadow duration-200"
      onClick={onOpen}
    >
      {/* You might want to use the coverImage here, for example: */}
      <img 
        src={coverImage} 
        alt={`Cover of ${title}`}
        className="w-full h-full object-cover"
      />
      
      {/* Or if you want to overlay text on the gradient background: */}
      {/* 
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <p className="text-sm text-gray-700">{author}</p>
      </div>
      */}
    </div>
  );
};