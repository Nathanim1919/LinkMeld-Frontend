import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@tanstack/react-router";
import { IoFolderOpen } from "react-icons/io5";
import { useCaptureContext } from "../../context/CaptureContext";

type NoteHeaderProps = {
  title: string;
  // folder: {
  //   id: string;
  //   name: string;
  // };
  description?: string;
  tags?: string[];
  capturedAt?: string;
};

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  // folder,
  description = "",
  tags = [],
  capturedAt,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 border-b border-gray-600"
    >
      {/* <Link
        to={`/folders/${folder.id}`}
        className="text-blue-500 flex items-center gap-1 hover:underline"
      >
        <IoFolderOpen />
        {folder.name || "Uncategorized"}
      </Link> */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        {capturedAt && (
          <span>Captured {formatDistanceToNow(new Date(capturedAt))} ago</span>
        )}
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {description && (
        <p className="text-gray-700 dark:text-gray-400 mt-1 text-sm">
          {description}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};
