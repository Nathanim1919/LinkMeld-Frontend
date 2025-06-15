import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { NewFolderFormCard } from "../cards/newFolderFormCard";
import { MdDeleteOutline } from "react-icons/md";
import { useSourceContext } from "../../context/sourceContext";
import { MdOutlineLanguage } from "react-icons/md";

// --- Component ---
type SmartSourceCardProps = {
  source: string;
  siteNameCount?: number;
  onOpen: (source: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const SmartSourceCard: React.FC<SmartSourceCardProps> = ({
  source,
  siteNameCount,
  onOpen,
}) => {
  
  return (
    <div
      className="relative border-b border-white/10 grid gap-1 w-full p-2 cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onOpen(source)}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-blue-700 hover:underline">
          <MdOutlineLanguage />
          <h2 className="text-sm font-semibold " title={source}>
            {source}
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {siteNameCount} Captures
        </p>
      </div>

      <div className=" absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="p-1 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
          title="Delete Folder"
        >
          <MdDeleteOutline className="text-zinc-600 dark:text-zinc-500" />
        </button>
      </div>
    </div>
  );
};

// --- Preview (for testing) ---
export const SmartSourcePreviewGrid = () => {
  const navigate = useNavigate();
  const [openNewFolderForm, setOpenNewFolderForm] = useState(false);

  const openFolder = (sourceName: string) => {
    navigate({ to: "/sources/$source", params: { source: sourceName } });
  };
  const renameFolder = (id: string) => alert(`Rename folder ${id}`);
  const deleteFolder = (id: string) => alert(`Delete folder ${id}`);

  const { sources, loading, siteNameCounts } = useSourceContext();

  return (
    <div className="flex relative flex-col w-full gap-2 p-3 self-start overflow-auto">
      <div className="sticky top-0 z-999 backdrop-blur-3xl px-3">
        <h2 className="text-sm flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-100">
          <MdOutlineLanguage className="inline-block text-lg" />
          Sources
        </h2>
      </div>
      <NewFolderFormCard
        open={openNewFolderForm}
        onClose={() => setOpenNewFolderForm(false)}
      />

      {loading && (
        <div className="flex items-center justify-center w-full h-20">
          <span className="text-sm text-zinc-500">Loading sources...</span>
        </div>
      )}

      {!loading && sources?.length === 0 && (
        <div className="flex items-center justify-center w-full h-20">
          <span className="text-sm text-zinc-500">No Sources available</span>
        </div>
      )}

      {sources?.map((source) => (
        <SmartSourceCard
          key={source}
          source={source}
          siteNameCount={siteNameCounts[source] || 0}
          onOpen={openFolder}
          onRename={renameFolder}
          onDelete={deleteFolder}
        />
      ))}
    </div>
  );
};

export default SmartSourceCard;
