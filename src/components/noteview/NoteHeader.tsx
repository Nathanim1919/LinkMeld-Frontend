import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const sentimentMap: Record<string, string> = {
  insightful: "🧠 Insightful",
  inspiring: "🤯 Inspiring",
  warning: "⚠️ Caution",
  neutral: "📄 Note",
};

type NoteHeaderProps = {
  title: string;
  tags?: string[];
  capturedAt?: string;
  sentiment?: "insightful" | "inspiring" | "warning" | "neutral";
};

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  tags = [],
  capturedAt,
  sentiment = "neutral",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-black/30 p-4 rounded-b-xl shadow-md"
    >
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{sentimentMap[sentiment]}</span>
        {capturedAt && (
          <span>
            Captured {formatDistanceToNow(new Date(capturedAt))} ago
          </span>
        )}
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
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
