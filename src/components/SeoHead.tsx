import React from 'react';
import { Helmet } from 'react-helmet';
import { SeoMetadata, generateProductJsonLd } from '../utils/seoUtils';
import { BookData } from '../types/book';

interface SeoHeadProps {
  metadata: SeoMetadata;
  bookData: BookData;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ metadata, bookData }) => {
  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="author" content={metadata.author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="book" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      {metadata.image && <meta property="og:image" content={metadata.image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      {metadata.image && <meta name="twitter:image" content={metadata.image} />}
      
      {/* Book-specific metadata */}
      <meta property="book:author" content={metadata.author} />
      {metadata.price && <meta property="book:price" content={metadata.price} />}
      {metadata.purchaseLink && <meta property="book:purchase_link" content={metadata.purchaseLink} />}
      
      {/* Product Schema (JSON-LD) */}
      <script type="application/ld+json">
        {generateProductJsonLd(bookData)}
      </script>
    </Helmet>
  );
}
