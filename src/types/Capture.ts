export interface Capture {
  _id: string;
  id: string; // Duplicate of _id in response
  url: string;
  title: string; // This should come directly from the top level
  slug: string;
  contentHash: string;
  bookmarked: boolean;
  canonicalUrl: string;
  
  // Content
  content: {
    clean: string;
    highlights: {
      text: string;
      annotation?: string;
      position: number[];
      createdAt: string;
      createdBy: string;
    }[];
    attachments: {
      type: string;
      url: string;
      thumbnail?: string;
      size: number;
      name?: string;
    }[];
  };
  
  // Metadata
  metadata: {
    description: string;
    favicon?: string;
    siteName?: string;
    language: string;
    keywords: string[];
    isPdf: boolean;
    type: string;
    wordCount: number;
    readingTime: number;
    capturedAt: string;
  };
  
  // System
  status: 'active' | 'archived' | 'deleted';
  privacy: 'private' | 'workspace' | 'public';
  version: number;
  source: {
    ip: string;
    userAgent: string;
    extensionVersion: string;
  };
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  __v: number;
}