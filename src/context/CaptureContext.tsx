// CaptureContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { CaptureService } from "../api/capture.api";
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

  const getCapture = useCallback(
    async (captureId: string): Promise<void> => {
      try {
        const response = await CaptureService.getById(captureId);
        setSelectedCapture(response); // Update state with the capture
      } catch (error) {
        setError(error as Error);
      }
    },
    []
  );

  const fetchCaptures = useCallback(
    async (filter: FilterType, id: string | null = null): Promise<void> => {
      try {
        const response = await CaptureService.getCapturesBasedOnFilter(filter, id);
        const formattedCaptures = response.map((capture: Capture) => ({
          ...capture,
          title: capture.title || "Untitled",
        }));
        setCaptures(formattedCaptures); // Update state only
      } catch (error) {
        setError(error as Error);
        throw error;
      }
    },
    []
  );

  const generateCaptureSummary = useCallback(async (captureId: string): Promise<Capture> => {
    if (pendingRequests.current.has(captureId)) {
      return pendingRequests.current.get(captureId)!;
    }
  
    setLoading(true);
    clearError();
  
    const promise = (async () => {
      try {
        const result = await CaptureService.generateSummary(captureId);
        if (!result.data) {
          throw new Error("Capture summary data is undefined");
        }
  
        // Return a Capture object with the AI summary included
        return {
          ...result.data.capture,
          summary: result.data.ai?.summary || "",
        };
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
      setCaptures((prev) =>
        prev.map((capture) =>
          capture._id === captureId
            ? { ...capture, bookmarked: !capture.bookmarked }
            : capture
        )
      );

      setSelectedCapture((prev) =>
        prev?._id === captureId
          ? { ...prev, bookmarked: !prev.bookmarked }
          : prev
      );

      await CaptureService.toggleBookmark(captureId);
    } catch (error) {
      // Revert on error
      setCaptures((prev) =>
        prev.map((capture) =>
          capture._id === captureId
            ? { ...capture, bookmarked: !capture.bookmarked }
            : capture
        )
      );

      setSelectedCapture((prev) =>
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
