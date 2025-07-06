import React from "react";
import { motion } from "framer-motion";

type NoteHeaderProps = {
  title: string;
  collection: {
    id: string;
    name: string;
  };
  description?: string;
  tags?: string[];
  capturedAt?: string;
};

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  description = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1 }}
      className="p-2 py-4 border-b border-gray-600"
    >
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
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
