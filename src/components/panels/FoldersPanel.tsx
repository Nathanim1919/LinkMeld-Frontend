import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useFolderContext } from "../../context/FolderContext";
import { IoFolderOpen } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa";
import { NewFolderFormCard } from "../cards/newFolderFormCard";
import { FaFolderMinus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const FoldersPanel: React.FC = () => {
  const { folders, loadingStates } = useFolderContext();
  const [openNewFolderForm, setOpenNewFolderForm] = useState(false);
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-999 backdrop-blur-3xl p-2">
        <div className="flex items-center justify-between">
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
      {loadingStates.fetch ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Loading folders...</p>
        </div>
      ) : folders.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No folders available.</p>
        </div>
      ) : null}
      <nav className="flex flex-col gap-2 p-2 overflow-y-auto">
        {folders.map((folder) => (
          <Link
            key={folder._id}
            to={`/in/folders/${folder._id}`}
            className={`block rounded-md group p-2 hover:bg-violet-500/5  cursor-pointer transition-colors`}
            activeOptions={{ exact: true }}
          >
            <span className="flex m-0 items-center gap-1 text-sm">
              <FaFolderMinus />
              {folder.name}
            </span>

            <div className="flex items-center justify-between">
              {folder.captures.length !== undefined && (
                <span className="text-sm self-end text-violet-500">
                  {folder.captures.length > 1
                    ? `${folder.captures.length} captures`
                    : `${folder.captures.length} capture`}
                </span>
              )}
              <div className="flex items-center justify-end gap-2 mt-1">
                <button
                  className="text-gray-500 opacity-0  bg-gray-800 cursor-pointer rounded-sm w-5 h-5 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-200 grid place-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    router.navigate({
                      to: `/in/folders/${folder._id}/edit`,
                      params: { folderId: folder._id },
                    });
                  }}
                >
                  <CiEdit />
                </button>
                <button
                  className="text-gray-500 opacity-0  bg-gray-800 cursor-pointer rounded-sm w-5 h-5 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-200 grid place-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add delete functionality here
                  }}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FoldersPanel;
