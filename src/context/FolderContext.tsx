import React, { createContext, useContext, useEffect, useState } from "react";
import type { IFolder } from "../types/Folder";
import { appendCaptureToFolder, getFolders } from "../api/folder.api";

interface FolderContextType {
  folders: IFolder[];
  setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>;
  selectedFolder: IFolder | null;
  setSelectedFolder: React.Dispatch<React.SetStateAction<IFolder | null>>;
  loadingStates: {
    fetch: boolean;
    append: boolean;
  };
  setLoadingStates: React.Dispatch<
    React.SetStateAction<{
      fetch: boolean;
      append: boolean;
    }>
  >;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
  addCaptureToFolder: (folderId: string, captureId: string) => Promise<void>;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Partial<IFolder> | null>(null);
  const [loadingStates, setLoadingStates] = useState({
    fetch: false,
    append: false,
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const addCaptureToFolder = async (folderId: string, captureId: string) => {
    setLoadingStates((prev) => ({ ...prev, append: true }));
    try {
      const res = await appendCaptureToFolder(folderId, captureId);
      if (res) {
        setFolders((prev) =>
          prev.map((folder) =>
            folder._id === folderId
              ? {
                  ...folder,
                  captures: [...folder.captures, { _id: captureId } as any],
                }
              : folder
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoadingStates((prev) => ({ ...prev, append: false }));
    }
  };

  useEffect(() => {
    console.log("Fetching folders...");
    const fetchFolders = async () => {
      setLoadingStates((prev) => ({ ...prev, fetch: true }));
      try {
        const response = await getFolders();
        setFolders(response); // Ensure response is of type IFolder[]
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoadingStates((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchFolders();
  }, []);

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        selectedFolder,
        setSelectedFolder,
        loadingStates,
        setLoadingStates,
        error,
        setError,
        addCaptureToFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = (): FolderContextType => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
};
