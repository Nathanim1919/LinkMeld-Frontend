import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { createFolder } from "../../api/folder.api";
import { useFolderContext } from "../../context/FolderContext";

interface NewFolderFormCardProps {
  open: boolean;
  onClose: () => void;
}

export const NewFolderFormCard = ({ open, onClose }: NewFolderFormCardProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setFolders } = useFolderContext();

  const handleFolderCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await createFolder(folderName);
      setFolders((prevFolders) => [...prevFolders, res]);
      setFolderName("");
      onClose();
    } catch (error) {
      console.error("Folder creation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative w-full max-w-md rounded-xl bg-gray-900 border border-gray-700 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-100">
                  New Collection
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 cursor-pointer rounded-full text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Organize your knowledge with collections
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFolderCreation} className="p-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="folderName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Collection Name
                  </label>
                  <input
                    type="text"
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g. Research Papers"
                    autoFocus
                    required
                    maxLength={50}
                  />
                  <p className="mt-1 text-xs text-gray-500 text-right">
                    {folderName.length}/50
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 cursor-pointer py-2 text-sm font-medium text-gray-300 hover:text-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !folderName.trim()}
                    className={`px-4 cursor-pointer py-2 text-sm font-medium rounded-lg transition-colors ${
                      isSubmitting || !folderName.trim()
                        ? "bg-blue-600/50 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <VscLoading className="inline mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Collection"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};