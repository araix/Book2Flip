import React, { useState, useEffect } from 'react';
import { BookReader } from './components/BookReader';
import { SeoHead } from './components/SeoHead';
import { MarkdownParser } from './utils/markdownParser';
import { BookData } from './types/book';
import { generateSeoMetadata } from './utils/seoUtils';
import manuscriptContent from './data/manuscript.md?raw';

function App() {
  const [bookData, setBookData] = useState<BookData | null>(null);
  
  useEffect(() => {
    try {
      const parsedBook = MarkdownParser.parseMarkdown(manuscriptContent);
      setBookData(parsedBook);
    } catch (error) {
      console.error('Error parsing manuscript:', error);
    }
  }, []);
  
  if (!bookData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  const seoMetadata = generateSeoMetadata(bookData);
  
  return (
    <div className="min-h-screen bg-amber-50">
      <SeoHead metadata={seoMetadata} bookData={bookData} />
      <BookReader bookData={bookData} />
    </div>
  );
}

export default App;
