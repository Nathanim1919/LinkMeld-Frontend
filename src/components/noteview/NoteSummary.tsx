import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaMagic, FaSyncAlt } from "react-icons/fa";

type NoteSummaryProps = {
  summary: string | null;
  loading: boolean;
  onRefresh?: () => void;
};

export const NoteSummary: React.FC<NoteSummaryProps> = ({
  summary,
  loading,
  onRefresh,
}) => {
  return (
    <div className="p-4 space-y-2 border-l-2 border-gray-500">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-sm font-semibold text-violet-500 flex items-center gap-1">
          <FaMagic className="text-purple-500" />
          Summary
        </h2>
        {/* {onRefresh && (
          <button
            onClick={onRefresh}
            className="text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline"
          >
            <FaSyncAlt />
            Refresh
          </button>
        )} */}
      </div>

      {loading ? (
        <Skeleton count={3} className="!h-4 rounded" />
      ) : summary ? (
        <p className="text-sm text-zinc-400">{summary}</p>
      ) : (
        <p className="text-sm italic text-zinc-400">No summary available.</p>
      )}
    
    </div>
  );
};
