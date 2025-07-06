import { useParams } from "@tanstack/react-router";
import { FaHashtag } from "react-icons/fa";
import NotesList from "./NotesList";

export const SourceNotes = () => {
  const { sourceId } = useParams({ strict: false });

  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-3 rounded-t-lg border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <FaHashtag className="text-purple-400" />
          Source Notes
        </h3>
        <span className="ml-2 text-xs font-medium text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full flex items-center gap-1">
          <FaHashtag className="text-xs" />
          {sourceId && sourceId.length > 15
            ? sourceId.slice(0, 15) + "..."
            : sourceId}{" "}
          {/* Updated to use sourceId */}
        </span>
      </div>
      <NotesList filter="source" sourceId={sourceId} />
    </div>
  );
};