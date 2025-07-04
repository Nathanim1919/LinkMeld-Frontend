// CaptureContext.tsx
import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import {
  bookMarkOrUnbookMarkCapture,
  generateSummary,
  getCaptureById,
  getCapturesBasedOnFilter,
} from "../api/capture.api";
import type { Capture } from "../types/Capture";

type FilterType = "all" | "bookmarks" | "folder" | "source";

interface CaptureContextType {
  captures: Capture[];
  selectedCapture: Capture | null;
  setSelectedCapture: React.Dispatch<React.SetStateAction<Capture | null>>;
  fetchCaptures: (filter: FilterType, id?: string | null) => Promise<void>;
  bookmarkCapture: (captureId: string) => Promise<void>;
  getCapture: (captureId: string) => Promise<void>;
  generateCaptureSummary: (captureId: string) => Promise<Capture>;
  loading: boolean;
  error: Error | null;
  clearError: () => void;
}

const CaptureContext = createContext<CaptureContextType | undefined>(undefined);

export const CaptureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const pendingRequests = useRef(new Map<string, Promise<Capture>>());

  const clearError = useCallback(() => setError(null), []);

  const getCapture = useCallback(async (captureId: string) => {
    try {
      const capture = await getCaptureById(captureId);
      if (capture) {
        setSelectedCapture(capture);
      }
      return capture;
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  }, []);

  const fetchCaptures = useCallback(async (filter: FilterType, id: string | null = null) => {
    try {
      const response = await getCapturesBasedOnFilter(filter, id);
      const formattedCaptures = response.map((capture: Capture) => ({
        ...capture,
        title: capture.title || 'Untitled',
      }));
      setCaptures(formattedCaptures);
      return formattedCaptures;
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  }, []);

  const generateCaptureSummary = useCallback(async (captureId: string): Promise<Capture> => {
    // Deduplicate simultaneous requests
    if (pendingRequests.current.has(captureId)) {
      return pendingRequests.current.get(captureId)!;
    }

    setLoading(true);
    clearError();

    const promise = (async () => {
      try {
        const {capture} = await generateSummary(captureId);
        
        // Update both captures list and selected capture
        setCaptures(prev => prev.map(c => 
          c._id === captureId ? { ...c, ai: capture?.ai } : c
        ));
        
        setSelectedCapture(prev => 
          prev?._id === captureId ? { ...prev, ai: capture.ai } : prev
        );
        
        return capture;
      } catch (error) {
        setError(error as Error);
        throw error;
      } finally {
        setLoading(false);
        pendingRequests.current.delete(captureId);
      }
    })();

    pendingRequests.current.set(captureId, promise);
    return await promise;
  }, [clearError]);

  const bookmarkCapture = useCallback(async (captureId: string) => {
    try {
      // Optimistic update
      setCaptures(prev => prev.map(capture => 
        capture._id === captureId 
          ? { ...capture, bookmarked: !capture.bookmarked } 
          : capture
      ));
      
      setSelectedCapture(prev => 
        prev?._id === captureId 
          ? { ...prev, bookmarked: !prev.bookmarked } 
          : prev
      );
      
      await bookMarkOrUnbookMarkCapture(captureId);
    } catch (error) {
      // Revert on error
      setCaptures(prev => prev.map(capture => 
        capture._id === captureId 
          ? { ...capture, bookmarked: !capture.bookmarked } 
          : capture
      ));
      
      setSelectedCapture(prev => 
        prev?._id === captureId 
          ? { ...prev, bookmarked: !prev.bookmarked } 
          : prev
      );
      
      setError(error as Error);
      throw error;
    }
  }, []);

  return (
    <CaptureContext.Provider
      value={{
        captures,
        selectedCapture,
        setSelectedCapture,
        fetchCaptures,
        bookmarkCapture,
        getCapture,
        generateCaptureSummary,
        loading,
        error,
        clearError,
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