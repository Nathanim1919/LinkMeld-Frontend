import type React from "react";
import { useCaptureContext } from "../context/CaptureContext";
import { Link, useParams } from "@tanstack/react-router";
import type { Capture } from "../types/Capture";
import { FaFolderClosed } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { GrCluster } from "react-icons/gr";
import { TbCaptureFilled } from "react-icons/tb";
import type { JSX } from "react";

interface NoteListProps {
  filter?: "all" | "bookmarks" | "folder" | "tag" | "cluster";
}

const filterLabels: Record<NonNullable<NoteListProps["filter"]>, string> = {
  all: "All Captures",
  bookmarks: "Bookmarks",
  folder: "Folder Notes",
  tag: "Tagged Notes",
  cluster: "Cluster Notes",
};

const filterIcons: Record<NonNullable<NoteListProps["filter"]>, JSX.Element> = {
  all: <TbCaptureFilled className="text-purple-500" />,
  bookmarks: <TbCaptureFilled className="text-purple-500" />, // You can use a heart/star icon here later
  folder: <FaFolderClosed className="text-yellow-500" />,
  tag: <FaHashtag className="text-blue-400" />,
  cluster: <GrCluster className="text-green-400" />,
};

const NotesList: React.FC<NoteListProps> = ({ filter = "all" }) => {
  const { captures, setSelectedCapture } = useCaptureContext();
  const params = useParams({ strict: false });
  const activeCaptureId = params?.captureId;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  if (!captures || captures.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No notes available</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h3 className="text-sm w-full border-b border-white/10 py-2 font-bold text-white mb-1 leading-tight flex items-center gap-2">
        {filterIcons[filter]}
        {filterLabels[filter]}
      </h3>

      <div className="flex flex-col max-h-[80vh] overflow-y-auto space-y-2 pr-1">
        {captures.map((note) => (
          <Link
            to={`/captures/${note._id}`}
            onClick={() => setSelectedCapture(note as Capture)}
            key={note._id}
            className={`cursor-pointer p-2 border-b transition-all rounded-md border border-transparent group
           ${
             activeCaptureId === note._id
               ? "bg-[#1d1f1d] border-violet-500/25 text-violet-500"
               : "hover:bg-[#1d1f1d] hover:border-violet-500/25"
           }
         `}
          >
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold  group-hover:underline group-hover:text-violet-500">
                  {note.metadata.title.length > 50
                    ? `${note.metadata.title.slice(0, 50)}...`
                    : note.metadata.title}
                </h3>
              </div>

              <p className="text-[12px] text-gray-400 mt-1 group-hover:text-gray-500">
                {note.metadata.description.length > 100
                  ? `${note.metadata.description.slice(0, 100)}...`
                  : note.metadata.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span title={formatDate(note.timestamp)}>
                {formatTimeAgo(note.timestamp)}
              </span>
              <span className="italic">{formatDate(note.timestamp)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
