// CaptureContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  bookMarkOrUnbookMarkCapture,
  getCapturesBasedOnFilter,
} from "../api/capture.api";
import type { Capture } from "../types/Capture";

type FilterType = "all" | "bookmarks" | "folder" | "source";

interface CaptureContextType {
  captures: Capture[];
  selectedCapture: Capture | null;
  setSelectedCapture: React.Dispatch<React.SetStateAction<Capture | null>>;
  fetchCaptures: (filter: FilterType, id?: string | null) => Promise<void>;
  bookmarkCapture?: (captureId: string) => Promise<void>;
}

const CaptureContext = createContext<CaptureContextType | undefined>(undefined);

export const CaptureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);

  const fetchCaptures = useCallback(
    async (filter: FilterType, id: string | null = null) => {
      try {
        const response = await getCapturesBasedOnFilter(filter, id);
        console.log(
          `📦 Fetching captures with filter: ${filter}, id: ${id}, response length: ${response.length} and captures list ${response}`
        );
        setCaptures(response);
      } catch (error) {
        console.error("Failed to fetch captures", error);
      }
    },
    []
  );

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
