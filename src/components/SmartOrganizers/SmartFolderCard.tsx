import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { IoFolderOpen } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { NewFolderFormCard } from "../cards/newFolderFormCard";
import axios from "axios";
import { useFolderContext } from "../../context/FolderContext";
import type { IFolder } from "../../types/Folder";

// --- Component ---
type SmartFolderCardProps = {
  folder: IFolder;
  onOpen: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const SmartFolderCard: React.FC<SmartFolderCardProps> = ({
  folder,
  onOpen,
  onRename,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative grid gap-1 w-full bg-white dark:bg-zinc-900 dark:border-zinc-700 rounded-2xl p-3 cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onOpen(folder._id)}
    >
      <div className={`bg-gray-800 place-self-start  p-1 rounded-md`}>
        <FaRegFolderOpen />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <h2
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
          title={folder.name}
        >
          {folder.name}
        </h2>

        <p
          className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3"
          title={folder.description}
        >
          {folder.description || "No description"}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
          {folder.captures.length}{" "}
          {folder.captures.length === 1 ? "capture" : "captures"}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          Updated {new Date(folder.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
      >
        <MoreVertical className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute top-8 right-2 z-20 bg-white dark:bg-zinc-800 shadow-lg rounded-md border border-zinc-200 dark:border-zinc-700 w-32 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-t-md"
            onClick={() => {
              onRename?.(folder._id);
              setMenuOpen(false);
            }}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-b-md text-red-500"
            onClick={() => {
              onDelete?.(folder._id);
              setMenuOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

// --- Preview (for testing) ---
export const SmartFolderPreviewGrid = () => {
  const navigate = useNavigate();
  const [openNewFolderForm, setOpenNewFolderForm] = useState(false);

  const openFolder = (id: string) => {
    navigate({ to: "/folders/$folderId", params: { folderId: id } });
  };
  const renameFolder = (id: string) => alert(`Rename folder ${id}`);
  const deleteFolder = (id: string) => alert(`Delete folder ${id}`);

  const { folders, loading } = useFolderContext();

  return (
    <div className="flex relative flex-col w-full gap-2 p-3 self-start overflow-auto">
      <div className="sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-100">
            <IoFolderOpen className="inline-block text-lg" />
            Folders
          </h2>
          <button
            className="cursor-pointer text-white rounded-md transition-colors duration-200"
            onClick={() => setOpenNewFolderForm(true)}
          >
            <FaFolderPlus className="inline-block mr-1" />
          </button>
        </div>
      </div>
      <NewFolderFormCard
        open={openNewFolderForm}
        onClose={() => setOpenNewFolderForm(false)}
      />

      {loading && (
        <div className="flex items-center justify-center w-full h-20">
          <span className="text-sm text-zinc-500">Loading folders...</span>
        </div>
      )}

      {!loading && folders.length === 0 && (
        <div className="flex items-center justify-center w-full h-20">
          <span className="text-sm text-zinc-500">No folders available</span>
        </div>
      )}

      {folders.map((folder) => (
        <SmartFolderCard
          key={folder._id}
          folder={folder}
          onOpen={openFolder}
          onRename={renameFolder}
          onDelete={deleteFolder}
        />
      ))}
    </div>
  );
};

export default SmartFolderCard;
