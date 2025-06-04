// Create a context for managing capture state
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCaptures } from "../api/capture.api";
import type { Capture } from "../types/Capture";

interface CaptureContextType {
  captures: Capture[];
  setCaptures: React.Dispatch<React.SetStateAction<Capture[]>>;
  setSelectedCapture: React.Dispatch<React.SetStateAction<Capture | null>>;
  selectedCapture: Capture | null;
}

const CaptureContext = createContext<CaptureContextType | undefined>(undefined);

export const CaptureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);

  useEffect(() => {
    getCaptures()
      .then((data) => {
        console.log("Fetched captures:", data);
        setCaptures(data);
      })
      .catch((error) => {
        console.error("Error fetching captures:", error);
      });
  }, []);

  return (
    <CaptureContext.Provider
      value={{ captures, setCaptures, selectedCapture, setSelectedCapture }}
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