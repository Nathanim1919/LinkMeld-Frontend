import React, { createContext, useContext, useEffect, useState } from "react";
import type { IFolder } from "../types/Folder";
import { getFolders } from "../api/folder.api";

interface FolderContextType {
  folders: IFolder[];
  setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>;
  selectedFolder: IFolder | null;
  setSelectedFolder: React.Dispatch<React.SetStateAction<IFolder | null>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);


  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      try {
        const response = await getFolders();
        setFolders(response); // Ensure response is of type IFolder[]
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
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
        loading,
        setLoading,
        error,
        setError,
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
