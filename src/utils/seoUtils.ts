import { BookData } from '../types/book';

export interface SeoMetadata {
  title: string;
  description: string;
  author: string;
  image?: string;
  price?: string;
  purchaseLink?: string;
}

export function generateSeoMetadata(bookData: BookData): SeoMetadata {
  // Ensure we have a valid cover image path
  const coverImage = bookData.coverImage || '/cover.jpg';
  
  // Create absolute URL for the cover image if it's a relative path
  const imageUrl = coverImage.startsWith('http') 
    ? coverImage 
    : new URL(coverImage, window.location.origin).toString();
  
  return {
    title: `${bookData.title} by ${bookData.author}`,
    description: bookData.subtitle || `Read ${bookData.title} by ${bookData.author} online`,
    author: bookData.author,
    image: imageUrl,
    price: bookData.purchaseInfo?.price,
    purchaseLink: bookData.purchaseInfo?.link
  };
}

export function generateProductJsonLd(bookData: BookData): string {
  // Ensure we have a valid cover image path
  const coverImage = bookData.coverImage || '/cover.jpg';
  
  // Create absolute URL for the cover image if it's a relative path
  const imageUrl = coverImage.startsWith('http') 
    ? coverImage 
    : new URL(coverImage, window.location.origin).toString();
  
  const productData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": bookData.title,
    "author": {
      "@type": "Person",
      "name": bookData.author
    },
    "description": bookData.subtitle || `${bookData.title} by ${bookData.author}`,
    "image": imageUrl,
    "url": window.location.href,
    "publisher": {
      "@type": "Organization",
      "name": "Book2Flip"
    }
  };

  // Add offers data if price is available
  if (bookData.purchaseInfo?.price) {
    Object.assign(productData, {
      "offers": {
        "@type": "Offer",
        "price": bookData.purchaseInfo.price.replace(/[^\d.]/g, ''), // Remove currency symbol
        "priceCurrency": bookData.purchaseInfo.price.startsWith('$') ? 'USD' : 'EUR', // Basic currency detection
        "availability": "https://schema.org/InStock",
        "url": bookData.purchaseInfo.link || window.location.href
      }
    });
  }

  return JSON.stringify(productData);
}
