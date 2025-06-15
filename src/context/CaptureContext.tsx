// CaptureContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  bookMarkOrUnbookMarkCapture,
  getCapturesBasedOnFilter,
  getBookmarkedCaptures,
} from "../api/capture.api";
import type { Capture } from "../types/Capture";

type FilterType = "all" | "bookmarks" | "folder" | "source";

interface CaptureContextType {
  captures: Capture[];
  selectedCapture: Capture | null;
  bookmarkedCaptures?: Capture[];
  setBookmarkedCaptures?: React.Dispatch<React.SetStateAction<Capture[]>>;
  setSelectedCapture: React.Dispatch<React.SetStateAction<Capture | null>>;
  fetchCaptures: (filter: FilterType, id?: string | null) => Promise<void>;
  bookmarkCapture?: (captureId: string) => Promise<void>;
  fetchBookmarkedCaptures: () => Promise<Capture[]>;
}

const CaptureContext = createContext<CaptureContextType | undefined>(undefined);

export const CaptureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);
  const [bookmarkedCaptures, setBookmarkedCaptures] = useState<Capture[]>([]);

  const fetchCaptures = useCallback(
    async (filter: FilterType, id: string | null = null) => {
      try {
        const response = await getCapturesBasedOnFilter(filter, id);
        setCaptures(response);
      } catch (error) {
        console.error("Failed to fetch captures", error);
      }
    },
    []
  );

  const fetchBookmarkedCaptures = useCallback(async (): Promise<Capture[]> => {
    try {
      const response = await getBookmarkedCaptures();
      setBookmarkedCaptures(response);
      return response;
    } catch (error) {
      console.error("Failed to fetch bookmarked captures", error);
      return [];
    }
  }, []);

  const bookmarkCapture = useCallback(
    async (captureId: string) => {
      try {
        // Implement the bookmarking logic here
        console.log(`Bookmarking capture with ID: ${captureId}`);
        await bookMarkOrUnbookMarkCapture(captureId);
        // Update the captures state if needed
        const updatedCaptures = captures.map((capture) =>
          capture._id === captureId
            ? { ...capture, isBookmarked: !capture.isBookmarked }
            : capture
        );
        setCaptures(updatedCaptures);
      } catch (error) {
        console.error(`❌ Error bookmarking or unbookmarking capture:`, error);
      }
    },
    [captures]
  );

  return (
    <CaptureContext.Provider
      value={{
        captures,
        selectedCapture,
        setSelectedCapture,
        fetchCaptures,
        bookmarkCapture,
        fetchBookmarkedCaptures,
        bookmarkedCaptures,
        setBookmarkedCaptures,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export const useCaptureContext = (): CaptureContextType => {
  const context = useContext(CaptureContext);
  if (!context) {
    throw new Error("useCaptureContext must be used within a CaptureProvider");
  }
  return context;
};
