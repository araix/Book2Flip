import { BookData, Chapter, Page, PurchaseInfo } from '../types/book';

export class MarkdownParser {
  private static readonly WORDS_PER_PAGE = 280;
  private static readonly LINES_PER_PAGE = 25;

  public static parseMarkdown(markdown: string): BookData {
    // Split frontmatter and content
    const parts = markdown.split(/^---\s*$/m);
    
    if (parts.length < 3) {
      throw new Error('Invalid markdown format: Missing frontmatter');
    }
    
    const frontmatter = parts[1].trim();
    const content = parts.slice(2).join('---').trim();
    
    // Parse frontmatter
    const metadata = this.parseFrontmatter(frontmatter);
    
    // Parse content into chapters and pages
    const { chapters, pages } = this.parseContent(content, metadata);
    
    // Create purchase info if available
    const purchaseInfo = this.createPurchaseInfo(metadata);
    
    return {
      title: metadata.title || 'Untitled Book',
      subtitle: metadata.subtitle,
      author: metadata.author || 'Unknown Author',
      coverImage: metadata.cover_image || '/cover.jpg', // Use cover.jpg as default
      chapters,
      pages,
      totalPages: pages.length,
      purchaseInfo
    };
  }
  
  private static parseFrontmatter(frontmatter: string): Record<string, string> {
    const metadata: Record<string, string> = {};
    
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        metadata[key] = value.trim();
      }
    });
    
    return metadata;
  }
  
  private static parseContent(content: string, metadata: Record<string, string>): { chapters: Chapter[], pages: Page[] } {
    const chapters: Chapter[] = [];
    const pages: Page[] = [];
    
    // Create a title page as the first page using metadata
    pages.push({
      id: 1,
      index: 0,
      chapter: 'Title',
      chapterId: 'title',
      content: this.createTitlePageContent(metadata)
    });
    
    // Split content into sections based on headings
    const sections = content.split(/^##\s+/m);
    
    // Process each section (chapter)
    let pageIndex = 2; // Start from page 2 (page 1 is title page, page 0 is cover)
    
    // First section might not have a heading, treat it as introduction
    if (sections[0].trim()) {
      const introTitle = "Introduction";
      const introId = "introduction";
      
      const chapter: Chapter = {
        id: introId,
        title: introTitle,
        pageStart: pageIndex
      };
      
      // Process intro content into pages
      const introContent = sections[0].trim();
      const introPages = this.paginateContent(introContent, introTitle);
      
      // Add pages
      introPages.forEach((pageContent, idx) => {
        pages.push({
          id: pageIndex,
          index: pageIndex - 1,
          chapter: introTitle,
          chapterId: introId,
          content: pageContent
        });
        pageIndex++;
      });
      
      // Update chapter end page
      chapter.pageEnd = pageIndex - 1;
      chapters.push(chapter);
    }
    
    // Process remaining sections with headings
    sections.slice(1).forEach((section, index) => {
      if (!section.trim()) return;
      
      // Extract chapter title and ID
      const lines = section.split('\n');
      const titleLine = lines[0];
      const titleMatch = titleLine.match(/^(.*?)(?:\s*\{#([\w-]+)\})?\s*$/);
      
      if (!titleMatch) return;
      
      const [, title, id = `chapter-${index + 1}`] = titleMatch;
      
      // Create chapter
      const chapter: Chapter = {
        id,
        title: title.trim(),
        pageStart: pageIndex
      };
      
      // Process chapter content into pages
      const chapterContent = lines.slice(1).join('\n').trim();
      const chapterPages = this.paginateContent(chapterContent, title.trim());
      
      // Add pages
      chapterPages.forEach((pageContent, idx) => {
        pages.push({
          id: pageIndex,
          index: pageIndex - 1,
          chapter: title.trim(),
          chapterId: id,
          content: idx === 0 ? `<h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4">${title.trim()}</h2>${pageContent}` : pageContent
        });
        pageIndex++;
      });
      
      // Update chapter end page
      chapter.pageEnd = pageIndex - 1;
      chapters.push(chapter);
    });
    
    return { chapters, pages };
  }
  
  private static createTitlePageContent(metadata: Record<string, string>): string {
    const title = metadata.title || 'Untitled Book';
    const subtitle = metadata.subtitle || '';
    const author = metadata.author || 'Unknown Author';
    
    return `
      <div class="flex flex-col items-center justify-center h-full text-center px-4">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-serif text-amber-900">${title}</h1>
        ${subtitle ? `<p class="text-xl sm:text-2xl md:text-3xl font-light italic text-amber-700 mb-8">${subtitle}</p>` : ''}
        <div class="w-24 h-1 bg-amber-500 mb-8 rounded-full"></div>
        <p class="text-xl sm:text-2xl md:text-3xl font-medium text-amber-800 mb-2">by</p>
        <p class="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-900">${author}</p>
      </div>
    `;
  }
  
  private static paginateContent(content: string, chapterTitle: string): string[] {
    const pages: string[] = [];
    const paragraphs = content.split(/\n\n+/);
    
    let currentPage = '';
    let wordCount = 0;
    let lineCount = 0;
    
    paragraphs.forEach(paragraph => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return;
      
      // Process headings
      if (paragraph.startsWith('#')) {
        // If we already have content, finish the current page
        if (currentPage) {
          pages.push(currentPage);
          currentPage = '';
          wordCount = 0;
          lineCount = 0;
        }
        
        // Add heading to new page
        const headingLevel = paragraph.match(/^#+/)[0].length;
        const headingText = paragraph.replace(/^#+\s+/, '');
        currentPage = `<h${headingLevel} class="text-lg sm:text-xl md:text-2xl font-bold mb-3">${headingText}</h${headingLevel}>`;
        return;
      }
      
      // Process regular paragraphs
      const words = paragraph.split(/\s+/).filter(Boolean);
      const estimatedLines = Math.ceil(words.length / 10); // Rough estimate of lines
      
      // Check if adding this paragraph would exceed page limits
      if (wordCount + words.length > this.WORDS_PER_PAGE || lineCount + estimatedLines > this.LINES_PER_PAGE) {
        // Finish current page
        pages.push(currentPage);
        currentPage = '';
        wordCount = 0;
        lineCount = 0;
      }
      
      // Add paragraph to current page
      if (currentPage) {
        currentPage += '\n\n';
      }
      
      // Format paragraph with basic markdown
      const formattedParagraph = this.formatMarkdown(paragraph);
      currentPage += `<p class="mb-4">${formattedParagraph}</p>`;
      
      wordCount += words.length;
      lineCount += estimatedLines;
    });
    
    // Add the last page if not empty
    if (currentPage) {
      pages.push(currentPage);
    }
    
    return pages;
  }
  
  private static formatMarkdown(text: string): string {
    // Basic markdown formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'); // Links
  }
  
  private static createPurchaseInfo(metadata: Record<string, string>): PurchaseInfo | undefined {
    if (metadata.purchase_link) {
      return {
        link: metadata.purchase_link,
        text: metadata.purchase_text || `Purchase the full book to continue reading.`,
        price: metadata.price
      };
    }
    
    return undefined;
  }
}
