import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useFolderContext } from "../../context/FolderContext";
import { motion, AnimatePresence } from "framer-motion";
import { NewFolderFormCard } from "../cards/newFolderFormCard";
import { IoFolderOpen } from "react-icons/io5";
import { FaFolderMinus, FaFolderPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const FoldersPanel: React.FC = () => {
  const { folders, loadingStates, setSelectedFolder } = useFolderContext();
  const [openNewFolderForm, setOpenNewFolderForm] = useState(false);
  const router = useRouter();
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b border-gray-800">
          <div className="flex items-center  gap-2">
            {/* <IoFolderOpen className="text-lg text-blue-400" /> */}
          <button
            onClick={() => setOpenNewFolderForm(true)}
            className="p-1.5 rounded-full cursor-pointer text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition-colors"
            aria-label="Create new collection"
          >
            <FaFolderPlus className="text-lg" />
          </button>
            <h2 className="text-md font-medium text-gray-200 tracking-wide">
              COLLECTIONS
            </h2>
        </div>
      </div>

      {/* New Folder Form */}
      <NewFolderFormCard
        open={openNewFolderForm}
        onClose={() => setOpenNewFolderForm(false)}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {loadingStates.fetch ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="mb-3"
            >
              <IoFolderOpen className="text-2xl" />
            </motion.div>
            <p className="text-sm">Loading collections...</p>
          </div>
        ) : folders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <FaFolderMinus className="text-3xl text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 mb-4">
              No collections yet. Create one to organize your knowledge.
            </p>
            <button
              onClick={() => setOpenNewFolderForm(true)}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              Create Collection
            </button>
          </div>
        ) : (
          <motion.ul className="">
            <AnimatePresence>
              {folders.map((folder) => (
                <motion.li
                  onClick={() => setSelectedFolder(folder)}
                  key={folder._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => setHoveredFolder(folder._id)}
                  onHoverEnd={() => setHoveredFolder(null)}
                >
                  <Link
                    to={`/in/folders/${folder._id}`}
                    className={`relative flex items-center justify-between border border-transparent hover:border-violet-600/10 px-3 py-2 rounded-lg transition-colors ${
                      router.state.location.pathname.includes(folder._id)
                        ? "bg-blue-900/20 text-blue-400"
                        : "hover:bg-gray-800/50 text-gray-300"
                    }`}
                    activeOptions={{ exact: true }}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FaFolderMinus 
                        className={`flex-shrink-0 ${
                          router.state.location.pathname.includes(folder._id)
                            ? "text-blue-400"
                            : "text-gray-500"
                        }`} 
                      />
                      <span className="truncate text-sm font-medium">
                        {folder.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {folder.captures.length > 0 && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400">
                          {folder.captures.length}
                        </span>
                      )}
                      
                      {/* <AnimatePresence>
                        {(hoveredFolder === folder._id || router.state.location.pathname.includes(folder._id)) && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-1 bg-gray-800/80 backdrop-blur-sm rounded-lg p-0.5"
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                router.navigate({
                                  to: `/in/folders/${folder._id}/edit`,
                                  params: { folderId: folder._id },
                                });
                              }}
                              className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-blue-400 transition-colors"
                              aria-label="Edit collection"
                            >
                              <CiEdit className="text-sm" />
                            </button>
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                              aria-label="Delete collection"
                            >
                              <MdDeleteOutline className="text-sm" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence> */}
                    </div>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default FoldersPanel;