import { FaFolder, FaFolderOpen } from "react-icons/fa";
import NotesList from "./NotesList";
import { FolderService } from "../api/folder.api";
import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";

export const FolderNotes = () => {
  const { folderId } = useParams({ strict: false });
  const [folder, setFolder] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await FolderService.getById(folderId);
      setFolder(response.name);
    };
    fetchFolder();
  }, [folderId]);

  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-3 rounded-t-lg border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-1">
          <FaFolderOpen className="text-green-400" />
          Folder Notes
        </h3>
        <span className="ml-2 text-xs font-medium text-green-400 bg-green-900/20 px-2 py-1 rounded-full flex items-center gap-1">
          <FaFolder className="text-xs" />
          {folder && folder.length > 15 ? folder.slice(0, 15) + "..." : folder}
        </span>
      </div>
      <NotesList filter="folder" folderId={folderId} />
    </div>
  );
};