export interface BookData {
  title: string;
  subtitle?: string;
  author: string;
  coverImage: string;
  chapters: Chapter[];
  pages: Page[];
  totalPages: number;
  purchaseInfo?: PurchaseInfo;
}

export interface Chapter {
  id: string;
  title: string;
  pageStart: number;
  pageEnd?: number;
}

export interface Page {
  id: number;
  index: number;
  chapter: string;
  chapterId: string;
  content: string;
}

export interface PurchaseInfo {
  link: string;
  text: string;
  price?: string;
}
