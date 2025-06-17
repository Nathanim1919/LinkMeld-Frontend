import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useFolderContext } from "../../context/FolderContext";
import { IoFolderOpen } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa";
import { NewFolderFormCard } from "../cards/newFolderFormCard";

const FoldersPanel: React.FC = () => {
  const { folders, loadingStates } = useFolderContext();
  const [openNewFolderForm, setOpenNewFolderForm] = useState(false);
  const router = useRouter();

  if (loadingStates.fetch)
    return <div className="p-4 text-gray-400">Loading folders...</div>;

  if (folders.length === 0)
    return <div className="p-4 text-gray-400">No folders found.</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-999 backdrop-blur-3xl px-3">
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
      <nav className="flex flex-col gap-2 p-4 bg-red-600 overflow-y-auto">
        {folders.map((folder) => (
          <Link
            key={folder._id}
            to={`/in/folders/${folder._id}`}
            className={`block p-3 rounded-md cursor-pointer transition-colors ${
              router.state.location.pathname === `/in/folders/${folder._id}`
                ? "bg-violet-600 text-white"
                : "hover:bg-violet-100 hover:text-violet-800"
            }`}
            activeOptions={{ exact: true }}
          >
            <div className="flex justify-between items-center">
              <span>{folder.name}</span>
              {folder.captures.length !== undefined && (
                <span className="text-sm text-gray-400">
                  {folder.captures.length}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FoldersPanel;
