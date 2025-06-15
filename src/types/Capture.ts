export interface Capture {
  _id: string;
  url: string;
  timestamp: string;
  isBookmarked: boolean;
  folder?: {
    _id: string;
    name: string;
  };
  metadata: {
    title: string;
    description: string;
    url: string;
    favicon: string;
    siteName: string;
    publishedTime: string;
    author: string;
    keywords: string;
    viewport: string;
    extractionMethod: string;
    isPdf: boolean;
  };
  mainText: string;
  documents: { url: string; type: string }[];
  metrics: {
    contentExtraction: number;
    documentExtraction: number;
    metadataExtraction: number;
    totalTime: number;
    textLength: number;
    documentCount: number;
  };
}
