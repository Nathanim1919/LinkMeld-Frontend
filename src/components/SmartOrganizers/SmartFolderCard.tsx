import React from "react";
import { MoreVertical } from "lucide-react";

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
  return (
    <div
      className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-2 cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onOpen(folder.id)}
    >
      {/* Color indicator */}
      <div
        className="w-3 h-3 rounded-full absolute top-4 right-4"
        style={{ backgroundColor: folder.color || "#ccc" }}
      />

      <div>
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {folder.name}
        </h2>

        {folder.description && (
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
            {folder.description}
          </p>
        )}
      </div>

      <div>
        <div className="text-xs font-bold text-white dark:text-white">
          {folder.captures} {folder.captures === 1 ? "capture" : "captures"}
        </div>

        <div className="text-xs text-zinc-400 dark:text-zinc-500">
          Updated {new Date(folder.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <div
        className="absolute top-2 right-2 hidden group-hover:flex flex-col items-end space-y-1"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

// --- Preview (for testing) ---
export const SmartFolderPreviewGrid = () => {
  const openFolder = (id: string) => alert(`Open folder ${id}`);
  const renameFolder = (id: string) => alert(`Rename folder ${id}`);
  const deleteFolder = (id: string) => alert(`Delete folder ${id}`);

  return (
    <div className="flex flex-col gap-2 p-3 self-start">
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
