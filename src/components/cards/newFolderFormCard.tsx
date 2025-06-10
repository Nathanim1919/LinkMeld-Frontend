import { motion } from "framer-motion";
import { X } from "lucide-react"; // Using Lucide for clean icons
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { createFolder } from "../../api/folder.api";
import { useFolderContext } from "../../context/FolderContext";

interface NewFolderFormCardProps {
  open: boolean;
  onClose: () => void;
}
export const NewFolderFormCard = ({
  open,
  onClose,
}: NewFolderFormCardProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const { setFolders, loading } = useFolderContext();

  const handleFolderCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createFolder(folderName);
    setFolders((prevFolders) => [...prevFolders, res]);
    setFolderName(""); // Clear the input field after creation
    onClose(); // Close the form after creation
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-folder-form-title"
      aria-describedby="new-folder-form-description"
      className="fixed left-[20%] max-w-[250px] z-999  shadow-2xl  mx-auto border border-gray-800 p-2 bg-white dark:bg-black/45 backdrop-blur-2xl rounded-md"
    >
      <X
        size={20}
        onClick={onClose}
        aria-label="Close"
        aria-hidden="true"
        tabIndex={0}
        role="button"
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
      />
      <form className="flex flex-col gap-4" onSubmit={handleFolderCreation}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="folderName"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Folder Name
          </label>
          <input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            type="text"
            id="folderName"
            name="folderName"
            required
            placeholder="Enter folder name"
            className="p-1 border border-white/5 outline-0 rounded-md bg-white/5 text-white focus:border-gray-300 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-600 transition-colors duration-200"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <button
          type="submit"
          className="w-full justify-self-end cursor-pointer bg-zinc-800 text-white py-1 rounded-md hover:bg-zinc-700 transition-colors duration-200"
        >
          {loading && <VscLoading className="inline mr-2 animate-spin" />}
          Create
        </button>
      </form>
    </motion.div>
  );
};
