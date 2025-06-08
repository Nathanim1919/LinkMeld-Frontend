import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { IoFolderOpen } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa";


// --- Type ---
export type SmartFolder = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  captures: number;
  updatedAt: string;
};

// --- Sample Data ---
const sampleFolders: SmartFolder[] = [
  {
    id: "1",
    name: "Deep Learning Papers",
    description: "Papers and notes on CNNs, RNNs, and Transformers",
    color: "#4F46E5", // indigo
    captures: 12,
    updatedAt: "2025-06-02T12:34:56Z",
  },
  {
    id: "2",
    name: "Product Ideas",
    description: "Random thoughts, notes, and feature lists",
    color: "#10B981", // emerald
    captures: 5,
    updatedAt: "2025-05-28T09:21:43Z",
  },
  {
    id: "3",
    name: "Design Inspirations",
    description: "Futuristic UIs and UX patterns from other apps",
    color: "#F59E0B", // amber
    captures: 8,
    updatedAt: "2025-05-30T18:05:10Z",
  },
  {
    id: "4",
    name: "Meeting Notes",
    description: "Notes from team meetings and client calls",
    color: "#EF4444", // red
    captures: 20,
    updatedAt: "2025-06-01T14:15:30Z",
  },
  {
    id: "5",
    name: "Research Projects",
    description: "Ongoing research and experiments",
    color: "#3B82F6", // blue
    captures: 15,
    updatedAt: "2025-06-03T10:00:00Z",
  },
  {
    id: "6",
    name: "Personal Journal",
    description: "Daily reflections and personal thoughts",
    color: "#D97706", // orange
    captures: 30,
    updatedAt: "2025-06-04T08:45:12Z",
  },
  {
    id: "7",
    name: "Travel Plans",
    description: "Itineraries, packing lists, and travel notes",
    color: "#8B5CF6", // purple
    captures: 10,
    updatedAt: "2025-06-05T11:30:45Z",
  },
];

// --- Component ---
type SmartFolderCardProps = {
  folder: SmartFolder;
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
      className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-3 cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onOpen(folder.id)}
    >
      {/* Color indicator */}
      <div
        className="w-3 h-3 rounded-full absolute top-4 right-4"
        style={{ backgroundColor: folder.color ?? "#d1d5db" }}
      />

      {/* Folder Info */}
      <div>
        <h2
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
          title={folder.name}
        >
          {folder.name}
        </h2>

        <p
          className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3"
          title={folder.description}
        >
          {folder.description || "No description"}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
          {folder.captures} {folder.captures === 1 ? "capture" : "captures"}
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
              onRename?.(folder.id);
              setMenuOpen(false);
            }}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-b-md text-red-500"
            onClick={() => {
              onDelete?.(folder.id);
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

  const openFolder = (id: string) => {
    navigate({ to: "/folders/$folderId", params: { folderId: id } });
  };
  const renameFolder = (id: string) => alert(`Rename folder ${id}`);
  const deleteFolder = (id: string) => alert(`Delete folder ${id}`);

  return (
    <div className="flex flex-col gap-2 p-3 self-start">
      <div>
        <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-100">
          <IoFolderOpen className="inline-block text-lg" />
           Folders
        </h2>
        <button
          className=""
          onClick={() => alert("Create new folder")}
        >
          <FaFolderPlus className="inline-block mr-1" />
        </button>
        </div>
        {/* <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Organize your captures into smart folders
        </p> */}
      </div>
      {sampleFolders.map((folder) => (
        <SmartFolderCard
          key={folder.id}
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
