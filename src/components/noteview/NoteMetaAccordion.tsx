import React from "react";
import { Calendar, Clock, FileText, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type NoteMetaBoxProps = {
  domain: string;
  savedAt: string;
  wordCount: number;
  tags?: string[];
};

export const NoteMetaBox: React.FC<NoteMetaBoxProps> = ({
  domain,
  savedAt,
  wordCount,
  tags = [],
}) => {
  const readingTime = Math.ceil(wordCount / 200); // Assuming ~200wpm

  return (
    <div className="dark:border-zinc-800 p-4 rounded-xl shadow-sm text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
      <div className="flex flex-wrap gap-4">
        <MetaItem icon={<Globe className="w-4 h-4" />} label={domain} />
        <MetaItem
          icon={<Calendar className="w-4 h-4" />}
          label={`Saved ${formatDistanceToNow(new Date(savedAt))} ago`}
        />
        <MetaItem
          icon={<FileText className="w-4 h-4" />}
          label={`${wordCount} words`}
        />
        <MetaItem
          icon={<Clock className="w-4 h-4" />}
          label={`${readingTime} min read`}
        />
      </div>

      {/* {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-zinc-200/50 dark:bg-zinc-700 text-xs px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )} */}
    </div>
  );
};

const MetaItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
    {icon}
    <span>{label}</span>
  </div>
);
