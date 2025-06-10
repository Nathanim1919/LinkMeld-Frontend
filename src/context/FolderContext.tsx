import React, { createContext, useContext, useState } from "react";
import type { IFolder } from "../types/Folder";

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
