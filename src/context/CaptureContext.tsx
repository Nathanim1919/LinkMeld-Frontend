// CaptureContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { getCapturesBasedOnFilter } from "../api/capture.api";
import type { Capture } from "../types/Capture";

type FilterType = "all" | "bookmarks" | "folder" | "source";

interface CaptureContextType {
  captures: Capture[];
  selectedCapture: Capture | null;
  setSelectedCapture: React.Dispatch<React.SetStateAction<Capture | null>>;
  fetchCaptures: (filter: FilterType, id?: string | null) => Promise<void>;
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

  return (
    <CaptureContext.Provider
      value={{
        captures,
        selectedCapture,
        setSelectedCapture,
        fetchCaptures,
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
