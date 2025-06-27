import { motion, AnimatePresence } from "framer-motion";
import { useFolderContext } from "../../context/FolderContext";
import { FaFolder } from "react-icons/fa";
import { useUI } from "../../context/UIContext";
import { useCaptureContext } from "../../context/CaptureContext";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState } from "react";
import { FiChevronRight, FiPlus } from "react-icons/fi";

export const FolderList: React.FC = () => {
  const { folders, loadingStates, addCaptureToFolder } = useFolderContext();
  const { isFolderListOpen, setIsFolderListOpen } = useUI();
  const { selectedCapture } = useCaptureContext();
  const [appendToFolderId, setAppendToFolderId] = useState<string | null>(null);

  const setCaptureFolder = async (folderId: string) => {
    if (!selectedCapture) return;
    try {
      setAppendToFolderId(folderId);
      await addCaptureToFolder(folderId, selectedCapture._id);
      setIsFolderListOpen?.(false);
    } catch (error) {
      console.error("Error adding capture to folder:", error);
    } finally {
      setAppendToFolderId(null);
    }
  };

  return (
    <AnimatePresence>
      {isFolderListOpen && (
        <motion.div
          className="fixed top-[6%] right-[8%] z-[1000]"
        >
          <motion.div
            className="flex flex-col w-60 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0.2 }}
          >
            <div className="p-3 border-b border-gray-800">
              <h3 className="font-medium text-sm text-gray-300 flex items-center gap-2">
                <FiPlus className="text-blue-400" />
                Add to folder
              </h3>
            </div>

            {loadingStates.fetch ? (
              <motion.div 
                className="flex items-center justify-center p-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <CgSpinnerTwoAlt className="text-gray-500 w-5 h-5 animate-spin" />
              </motion.div>
            ) : folders.length === 0 ? (
              <motion.p 
                className="p-3 text-sm text-gray-500 text-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                No folders available
              </motion.p>
            ) : (
              <motion.ul className="divide-y divide-gray-800/50">
                {folders.map((folder) => (
                  <motion.li
                    key={folder._id}
                    initial={{ opacity: 1, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * folders.indexOf(folder) }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="px-3 py-2.5 cursor-pointer transition-colors"
                    onClick={() => setCaptureFolder(folder._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {loadingStates.append && appendToFolderId === folder._id ? (
                          <CgSpinnerTwoAlt className="text-blue-400 w-4 h-4 animate-spin" />
                        ) : (
                          <FaFolder className="text-blue-400/80 w-4 h-4" />
                        )}
                        <span className="text-sm text-gray-300 truncate max-w-[140px]">
                          {folder.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 bg-gray-800/50 px-1.5 py-0.5 rounded-full">
                          {folder.captures.length}
                        </span>
                        <FiChevronRight className="text-gray-500 w-3 h-3" />
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};