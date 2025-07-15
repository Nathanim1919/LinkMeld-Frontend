import React from "react";
import { motion } from "framer-motion";
import { CiStickyNote } from "react-icons/ci";
import { FileText } from "lucide-react";


type NoteHeaderProps = {
  title: string;
  collection: {
    id: string;
    name: string;
  };
  isPdf?: boolean;
  description?: string | RegExpMatchArray | null;
  tags?: string[];
  capturedAt?: string;
};

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  description = "",
  isPdf = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1 }}
      className="p-2 py-4 border-b border-gray-800"
    >
      <h1 className="text-2xl flex gap-2 font-semibold text-gray-900 dark:text-gray-100">
        {!isPdf ? (
          <CiStickyNote
           className="text-gray-500"
          size={32}
          />
        ) : (
          <FileText 
          className="text-red-700"
          size={32}
          />
        )}
        {title}
      </h1>
      {description && (
        <p className="text-gray-700 dark:text-gray-400 mt-1 text-sm">
          {description}
        </p>
      )}
    </motion.div>
  );
};
